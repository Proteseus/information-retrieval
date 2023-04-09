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
    for i in tqdm(range(0, 10), desc='Fetching blog details'):
        if i == 0:
            url = 'https://amharic-zehabesha.com/%E1%88%AD%E1%8B%95%E1%88%B5/%e1%8a%aa%e1%8a%90-%e1%8c%a5%e1%89%a0%e1%89%a5'
        else:
            url = f'https://amharic-zehabesha.com/%E1%88%AD%E1%8B%95%E1%88%B5/%e1%8a%aa%e1%8a%90-%e1%8c%a5%e1%89%a0%e1%89%a5/page/{i}'

        try:
            response = requests.get(url)

            parsedHTML = BeautifulSoup(response.text, 'html.parser')

            stories = parsedHTML.findAll('div', class_='wi-blog')
            next_ = parsedHTML.findAll('a', class_='next')

            for story in stories:
                story_title = story.find('h2', class_='post-item-title').find('a')
                story_date = story.find('div', class_='post-item-meta').find('div').find('time')
                story_ref = story_title

                formatted_stories.append({
                    'title': story_title.text,
                    'date': story_date.text,
                    'url': story_ref['href']
                })

            paged[i+1] = formatted_stories
        except requests.exceptions.SSLError:
            continue

    with open('kinetibeb_stories.json', 'w') as file:
        file.write(json.dumps(paged, indent=4))

    print("Blog details fetched")


async def get_response(url: str):
    # try:
    return await asyncio.to_thread(requests.get, url)
    # except requests.exceptions.SSLError:
    #     pass


async def fetch_blog(url: str) -> dict:
    story = ""

    try:
        response = await get_response(url)
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
    with open('kinetibeb_stories.json', 'r') as file_:
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

    dict_count = len(stories)
    df = pd.DataFrame(stories[0], index=[0])
    for i in range(1, dict_count - 1):
        df = df.append(stories[i], ignore_index=True)

    df.to_excel('kinetibebPressRelease.xlsx', sheet_name='news', index=False)
    print("Done writing to excel!")


def main():
    get_pages()
    asyncio.run(write_to_excel())