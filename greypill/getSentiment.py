from nltk.sentiment.vader import SentimentIntensityAnalyzer

def getSetiment(string):
  sid = SentimentIntensityAnalyzer()
  ss = sid.polarity_scores(string)
  return ss
