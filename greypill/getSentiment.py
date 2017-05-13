from nltk.sentiment.vader import SentimentIntensityAnalyzer

<<<<<<< Updated upstream
def getSetiment(string):
  sid = SentimentIntensityAnalyzer()
  ss = sid.polarity_scores(string)
  return ss
=======
def getSentiment(paragraph):
    sid = SentimentIntensityAnalyzer()
    ss = sid.polarity_scores(paragraph)
    return ss

if __name__ == '__main__':
    print getSentiment("Time to go west!")
>>>>>>> Stashed changes
