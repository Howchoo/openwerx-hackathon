from rssfeedinterface import *
import re
feed = RssFeedInterface('https://streemian.com/rss/')
currentRss = str(feed.get_feed_entries())
urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', currentRss)
urlPics = re.findall('https?://\S+?/\S+?\.(?:jpg|jpeg|gif|png)', currentRss)
