# GNAT: Grey Network Analysis Tool
DKE's entry in the [Grey Pill OPENWERX hackathon](http://www.hackathon.io/openwerx-data1), GNAT is a scalable, modular tool for monitoring grey social networks, performing sentament analysis and more.

## Dependencies
- Python 2.7
- [NLTK](http://www.nltk.org/install.html)
- [Scrapy](https://scrapy.org/)
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/)
- [Mastadon.py](http://mastodonpy.readthedocs.io/en/latest/)

Steps to setup environment
```pip install -r requirements.txt`

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs git python-pip exiftool lolcat

sudo pip  -U nltk install feedparser flask twython

in python
>>> import nltk
>>> nltk.download()
---set download dir to /usr/share/nltk_data
``

# GNAT API documentation

## Perform sentiment analysis on an arbitrary set of text data
```
POST http://localhost:5000/analyze_this
"Content-Type: application/json"
{
    "sentences":["Time to go west", ... , "There's not reason this won't work"]
}
```

## Obtaining initial nltk data
```
cd ~/project-folder/greypill
python
import nltk
nltk.download()
```

## Update config file
Rename `config.json.sample` to `config.json` and update with your own values.

## Retrieve the most recent entries in the Streemit RSS feed with sentiment analysis data
```GET http://localhost:5000/most_recent```

Sample Reponse:
```
[
  [
    {
      "sentiment": {
        "compound": -0.9153, 
        "neg": 0.077, 
        "neu": 0.923, 
        "pos": 0.0
      }, 
      "summary_detail": "i want your skulls, i need your skulls,i want your skulls, i need your skulls", 
      "title": "Mason's Haikus"
    }
  ],
  ...,
  [
    ...
  ]
]
```
