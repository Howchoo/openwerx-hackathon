import feedparser
from bs4 import BeautifulSoup


class RssFeedInterface():
    """Interface for pulling data from RSS feed"""
    
    base_url = None
    feed = None
    
    def __init__(self, rss_url):
        self.base_url = rss_url
        try:
            self.feed = feedparser.parse(rss_url)
        except Exception as e:
            raise
            
    def get_full_feed(self):
        return self.feed
    
    def get_feed_length(self):
        return len(self.get_full_feed()['entries'])
    
    def get_single_entry(self, index):
        if (index <= self.get_feed_length()):
            return self.get_full_feed()['entries'][index]
        else:
            print 'Index out of range of feed entires'
            return None
    
    def refresh_feed(self):
        self.feed = feedparser.parse(self.base_url)
        return self.feed
        
        
if __name__ == '__main__':
    feed = RssFeedInterface('https://streemian.com/rss/')
    print feed.get_single_entry(0)['title']
    print feed.get_single_entry(1)['title']
    feed.refresh_feed()
    print feed.get_single_entry(0)['title']