# This is an example workflow
from rssfeedinterface import *
feed = RssFeedInterface('https://streemian.com/rss/')
someNews = feed.get_single_entry(0)
from getSentiment import *
getSetiment(str(someNews))
