from bs4 import BeautifulSoup
import urllib2


class SteemitPage():
    """Steemit web page"""
    
    base_url = None
    page = None
    
    def __init__(self, url):
        
        self.base_url = url
        
        try:
            self.page = urllib2.urlopen(url)
        except Exception as e:
            raise
            
class SteemitPageParser():
    """Interface for parsing data form a Steemit web page"""
    
    def __init__(self):
        pass