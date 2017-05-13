import feedparser
import json
from bs4 import BeautifulSoup

def pull_latest(feed_URL, howManyFeedsToPull ):
	latestFeed = {}
	for i in range (howManyFeedsToPull):
		feed = feedparser.parse( feed_URL )
		latestFeed[i] = BeautifulSoup(feed['entries'][0]['summary_detail']['value'], "lxml")  #this makes soup be the latest single feed in streem
	return latestFeed

#TO USE
#from rssAnalyzer import *
#pull_latest('https://streemian.com/rss/',5)


#This may only work on https://streemian.com/rss/


