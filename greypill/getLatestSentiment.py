# This gets the sentiment of the latest steem post

from getSentiment import *
from rssfeedinterface import *

feed = RssFeedInterface('https://streemian.com/rss/')
someNews = feed.get_single_entry(0)
getSetiment(str(someNews))
