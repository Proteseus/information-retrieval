import json
import pprint
import asyncio
import requests
from tqdm import tqdm
from bs4 import BeautifulSoup
import pandas as pd
import openpyxl


paged = {}
formatted_stories: list = []


def get_pages():
    for i in tqdm(range(0, 100)):
        if i == 0:
            url = 'https://www.press.et/?cat=8'
        else:
            url = f'https://www.press.et/?paged={i + 1}&amp;cat=8'
        # print(url)
        response = requests.get(url)

        parsedHTML = BeautifulSoup(response.text, 'html.parser')

        stories = parsedHTML.findAll('div', class_='post')
        next_ = parsedHTML.findAll('a', class_='next')
        # print(next_['href'])

        for story in stories:
            story_title = story.find('h2', class_='entry-title')
            story_date = story.find('span', class_='entry-date')
            summary = story.find('div', class_='entry-summary')
            read_more_ref = summary.find('a')
            # print("Read more:", read_more_ref['href'])

            formatted_stories.append({
                'title': story_title.text,
                'date': story_date.text,
                'url': read_more_ref['href']
            })

        # pprint.pprint(formatted_stories, indent=4)

        paged[i+1] = formatted_stories
        # pprint.pprint(paged[i+1], indent=4)

    with open('stories.json', 'w') as file:
        file.write(json.dumps(paged, indent=4))


async def get_response(url: str) :
    return await asyncio.to_thread(requests.get, url)


async def fetch_blog(url: str) -> dict:
    story = ""
    response = await get_response(url)

    parsedHTML = BeautifulSoup(response.text, 'html.parser')

    title = parsedHTML.find('h1', class_='entry-title')
    date_ = parsedHTML.find('span', class_='entry-date')
    stories = parsedHTML.findAll('p')

    for s in stories:
        story += " " + s.text

    return {
        'title': title.text,
        'date': date_.text,
        'story': story,
        'author': stories[-2],
        'url': url
    }


async def get_stories():
    urls = []
    blog = []
    with open('stories.json', 'r') as file_:
        paged_ = json.loads(file_.read())

    for page in paged_:
        # print(page)
        for story in paged_[page]:
            urls.append(story['url'])

    with tqdm(total=len(urls), desc='Fetching articles') as pbar:
        for url in urls:
            blog.append(await fetch_blog(url))
            pbar.update(1)

    return blog


# pprint.pprint(paged, indent=4)

# get_stories()
# pprint.pprint(get_stories(), indent=4)


async def write_to_excel():
    stories = await get_stories()
    df = pd.DataFrame(stories, columns=['author', 'date', 'story', 'title', 'url'])
    df.to_excel('pressRelease.xlsx', sheet_name='news', index=False)
    print("Done writing to excel!")


asyncio.run(write_to_excel())
