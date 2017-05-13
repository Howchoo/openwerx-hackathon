import feedparser


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
    
    def get_feed_entries(self):
        return self.get_full_feed()['entries']
    
    def get_feed_length(self):
        return len(self.get_feed_entries())
    
    def get_feed_titles(self):
        return map(lambda x: self.get_feed_entries()[x]['title'], range(self.get_feed_length()))
    
    def get_single_entry(self, index):
        if (index <= self.get_feed_length()):
            return self.get_feed_entries()[index]
        else:
            print 'Index out of range of feed entires'
            return None
        
    def get_range_entries(self, start, stop):
        """definitely a bug if not given a valid range"""
        feedlen = self.get_feed_length()
        if (start <= stop):
            if (start >= 0 and start < feedlen and stop < feedlen):
                return map(lambda x: self.get_feed_entries()[x], range(start, stop+1))
        else:
            print 'Start index must be greater than or equal to stop index'
            return None
    
    def refresh_feed(self):
        self.feed = feedparser.parse(self.base_url)
        return self.feed
        
        
if __name__ == '__main__':
    feed = RssFeedInterface('https://streemian.com/rss/')
    print feed.get_single_entry(0)['title']
    print feed.get_feed_titles()
    print feed.get_range_entries(0,9)