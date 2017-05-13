from nltk.sentiment.vader import SentimentIntensityAnalyzer

class SentimentAnalyzer():
    
    sid = None
    
    def __init__(self):
        self.sid = SentimentIntensityAnalyzer()
        
    def getSentiment(self, paragraph):
        return self.sid.polarity_scores(paragraph)

if __name__ == '__main__':
    print getSentiment("Time to go west!")