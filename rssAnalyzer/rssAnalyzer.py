import feedparser
import json
from bs4 import BeautifulSoup

def pull_latest(feed_URL, howManyFeedsToPull ):
	for i in range (howManyFeedsToPull):
		feed = feedparser.parse( feed_URL )
		soup = BeautifulSoup(feed['entries'][0]['summary_detail']['value'])  #this makes soup be the latest single feed in streem
	return soup
#TO USE
#from rssAnalyzer.py import *
#pull_latest('https://streemian.com/rss/',5)

#This may only work on https://streemian.com/rss/