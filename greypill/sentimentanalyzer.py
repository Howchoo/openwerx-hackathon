from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords
from collections import Counter
import nltk

class SentimentAnalyzer():
    
    sid = None
    
    def __init__(self):
        self.sid = SentimentIntensityAnalyzer()
        
    def getSentiment(self, paragraph):
        return self.sid.polarity_scores(paragraph)
    
    def generateTags(self, paragraph):
        tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
        tokens = tokenizer.tokenize(paragraph)
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(token) for token in tokens]
        swords = stopwords.words('english')
        tokens = [token for token in tokens if token not in swords]
        tf[curr_doc_index] = Counter(tokens)
        print tokens

if __name__ == '__main__':
    sa = SentimentAnalyzer()
    print sa.generateTags("Time to go west!")