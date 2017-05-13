# openwerx-hackathon
5/12 Hacking cool things and being 1337

## Dependencies
- Python 2.7
- [NLTK](http://www.nltk.org/install.html)
- [Scrapy](https://scrapy.org/)
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/)
- [Mastadon.py](http://mastodonpy.readthedocs.io/en/latest/)

Steps to setup environment
```pip install -r requirements.txt```

# GNAT API documentation:

## Perform sentiment analysis on an arbitrary set of text data
```
POST http://localhost:5000/analyze_this
"Content-Type: application/json"
{
    "sentences":["Time to go west", ... , "There's not reason this won't work"]
}
```

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
