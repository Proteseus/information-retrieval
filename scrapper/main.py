import json
import pprint
import asyncio
import requests
from tqdm import tqdm
from bs4 import BeautifulSoup
import pandas as pd
import openpyxl

# initialize dictionaries and lists
paged = {}
formatted_stories: list = []


def get_pages():
    """
    This function scrapes news articles from the first 100 pages of a website, extracts the title, date, and URL of 
    each article, and stores them in a dictionary with page numbers as keys. The resulting dictionary is then saved 
    as a JSON file named "stories.json".
    """
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
    """
    This function makes an asynchronous HTTP request to a given URL and returns the response.
    """
    return await asyncio.to_thread(requests.get, url)


async def fetch_blog(url: str) -> dict:
    """
    This function fetches the contents of a news article from a given URL, extracts the title, date, author, story, and 
    URL of the article, and returns them as a dictionary.
    """
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
        'author': stories[-2].text,
        'url': url
    }


async def get_stories():
    """
    This function reads the JSON file named "stories.json", extracts the URLs of all the news articles, fetches the 
    contents of each article using the fetch_blog function, and returns a list of dictionaries, where each dictionary 
    represents a news article.
    """
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
    """
    This function writes the contents of the news articles to an Excel file named 
    """
    stories = await get_stories()
    df = pd.DataFrame(stories, columns=['author', 'date', 'story', 'title', 'url'])
    df.to_excel('pressRelease.xlsx', sheet_name='news', index=False)
    print("Done writing to excel!")


asyncio.run(write_to_excel())
