import os, time, json, re
# scrapper
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
# cache
import redis
from redis.commands.json.path import Path

def scrap_superteam():
  try:
    print("setting up dotenv..")
    load_dotenv()
    print("dotenv ready !")
  except:
    print("error setting up dotenv !")

  r = redis.Redis(host='redis://192.168.1.166', port=6379, db=0)

  try:
    print("setting up browser..")
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # example
    browser = webdriver.Remote("http://192.168.1.166:4444/wd/hub", options=options)
    browser.maximize_window()
    print("browser ready !")
  except:
    print("error setting up browser !")

  try:
    print("visiting website..")
    browser.get('https://earn.superteam.fun/all/')
    assert 'Superteam' in browser.title
    print("we are on site !")

    print("waiting 5 seconds..")
    time.sleep(5)

    print("searching elements..")
    elements = browser.find_elements(By.CLASS_NAME, 'css-gtanjf')
    # elements = browser.find_elements(By.CLASS_NAME, 'css-1nzqt75')
    print("found {} elements".format(len(elements)))

    result = []

    for x, element in enumerate(elements):
      children = element.find_elements(By.XPATH, '*')
      link = element.get_attribute('href')
      # print("element have {} children".format(len(children)))
      for i, child in enumerate(children):
        try:
          # print("child n°{} :\n {}".format(i, child.text))
          splitter = child.text.split("\n")
          # print(splitter)
          if i == 0 and len(splitter) == 7:
            description = splitter[0] or ""
            contractor = splitter[1] or ""
            modal = splitter[2] or ""
            amount = splitter[5] or ""
            currency = splitter[6] or ""
            end = splitter[4] or ""
          else:
            description = ""
            contractor = ""
            modal = ""
            amount = ""
            currency = ""
            end = ""
          
        except:
          print("error processing child n°{}".format(i, child.text))
      if re.match(r"Closed (\w+|[0-9]*) \w+ \w+", end):
        pass
      else:
        value = json.dumps({
          "id": x + 1,
          "description": description,
          "contractor": contractor,
          "modal": modal,
          "amount": amount,
          "currency": currency,
          "end": end,
          "source": "superteam",
          "link": link
        })
        print(value)
        result.append(value)

    browser.quit()
    r.json().set('superteam', Path.root_path(), result)
    # print(result)
    with open("sample.json", "w") as outfile:
      outfile.write(json.dumps(result))

  except:
    browser.quit()