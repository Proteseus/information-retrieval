import json
import pprint
import asyncio
import requests
from tqdm import tqdm
from bs4 import BeautifulSoup
import pandas as pd
import openpyxl


paged = {}


def get_pages():
    for i in tqdm(range(0, 20), desc='Fetching blog details'):
        formatted_stories: list = []
        if i == 0:
            url = 'https://www.ethiopianreporter.com/sport/'
        elif i == 1:
            continue
        else:
            url = f'https://www.ethiopianreporter.com/sport/page/{i}'

        try:
            response = requests.get(url)

            parsedHTML = BeautifulSoup(response.text, 'html.parser')

            stories = parsedHTML.findAll('div', class_='td-cpt-post')

            for story in stories:
                story_title = story.find('h3', class_='entry-title').find('a')
                story_ref = story_title

                formatted_stories.append({
                    'title': story_title.text,
                    'url': story_ref['href']
                })
            if i == 0:
                paged[1] = formatted_stories
            else:
                paged[i] = formatted_stories
        except requests.exceptions.SSLError:
            continue

    with open('ethiopianReporterSport_stories.json', 'w') as file:
        file.write(json.dumps(paged, indent=4))

    print("Blog details fetched")


async def get_response(url: str):
    return await asyncio.to_thread(requests.get, url)


async def fetch_blog(url: str) -> dict:
    story = ""

    try:
        response = await get_response(url)
        parsedHTML = BeautifulSoup(response.text, 'html.parser')

        title = parsedHTML.find('h1', class_='tdb-title-text')
        author = parsedHTML.find('div', class_='tdb-author-name-wrap').find('a')
        date_ = parsedHTML.find('time')
        content = parsedHTML.find('div', class_='td-post-content').find('div', class_='tdb-block-inner')
        stories = content.findAll('p')

        for s in stories:
            story += " " + s.text

        return {
            'title': title.text,
            'author': author.text,
            'date': date_.text,
            'story': story,
            'url': url
        }
    except Exception:
        pass


async def get_stories():
    urls = []
    blog = []
    with open('ethiopianReporterSport_stories.json', 'r') as file_:
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


async def write_to_excel():
    stories = await get_stories()

    dict_count = len(stories)
    df = pd.DataFrame(stories[0], index=[0])
    for i in range(1, dict_count - 1):
        df2 = pd.DataFrame(stories[i], index=[0])
        # df = df.append(stories[i], ignore_index=True)
        df = pd.concat([df, df2], ignore_index=True)

    df.to_excel('ethiopianReporterSportPressRelease.xlsx', sheet_name='news', index=False)
    print("Done writing to excel!")


def main():
    get_pages()
    asyncio.run(write_to_excel())
