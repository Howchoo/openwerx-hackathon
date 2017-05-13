from nltk.sentiment.vader import SentimentIntensityAnalyzer

def getSetiment(paragraph):
  sid = SentimentIntensityAnalyzer()
  ss = sid.polarity_scores(talk)
  return ss
