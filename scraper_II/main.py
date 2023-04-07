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
    for i in tqdm(range(0, 5), desc='Fetching blog details'):
        if i == 0:
            url = 'https://amharic-zehabesha.com/'
        else:
            url = f'https://amharic-zehabesha.com/page/{i}'

        response = requests.get(url)

        parsedHTML = BeautifulSoup(response.text, 'html.parser')

        stories = parsedHTML.findAll('article', class_='elementor-post')
        next_ = parsedHTML.findAll('a', class_='next')

        for story in stories:
            story_title = story.find('h3', class_='elementor-post__title').find('a')
            story_date = story.find('div', class_='elementor-post__meta-data').find('span')
            story_ref = story_title

            formatted_stories.append({
                'title': story_title.text,
                'date': story_date.text[1:-2],
                'url': story_ref['href']
            })

        paged[i+1] = formatted_stories

    with open('stories.json', 'w') as file:
        file.write(json.dumps(paged, indent=4))

    print("Blog details fetched")


async def get_response(url: str) :
    return await asyncio.to_thread(requests.get, url)


async def fetch_blog(url: str) -> dict:
    story = ""
    response = await get_response(url)

    try:
        parsedHTML = BeautifulSoup(response.text, 'html.parser')

        title = parsedHTML.find('h1', class_='post-title')
        date_ = parsedHTML.find('time', class_='published')
        stories = parsedHTML.findAll('p')

        for s in stories:
            story += " " + s.text

        return {
            'title': title.text,
            'date': date_.text,
            'story': story,
            'url': url
        }
    except Exception:
        pass


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
    df = pd.DataFrame(stories, columns=['date', 'story', 'title', 'url'])
    df.to_excel('pressRelease.xlsx', sheet_name='news', index=False)
    print("Done writing to excel!")


get_pages()
asyncio.run(write_to_excel())
