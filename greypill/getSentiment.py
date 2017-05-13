from nltk.sentiment.vader import SentimentIntensityAnalyzer

def getSentiment(paragraph):
    sid = SentimentIntensityAnalyzer()
    ss = sid.polarity_scores(paragraph)
    return ss

if __name__ == '__main__':
    print getSentiment("Time to go west!")
