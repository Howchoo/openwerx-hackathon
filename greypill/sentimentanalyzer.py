from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

class SentimentAnalyzer():
    
    sid = None
    
    def __init__(self):
        self.sid = SentimentIntensityAnalyzer()
        
    def getSentiment(self, paragraph):
        return self.sid.polarity_scores(paragraph)
    
    def generateTags(self, paragraph, num_tags=5, weight=3):
        
        try:
            text = nltk.word_tokenize(paragraph)
            tagged_sent = nltk.pos_tag(text)
            nouns = [word for word,pos in tagged_sent if pos == 'NNP' or pos=='NN']
            freq_nouns = nltk.FreqDist(nouns)
            most_common = freq_nouns.most_common(num_tags)
            tags = {}
            for word in most_common:
                if word[1] >= weight:
                    tags.update({word[0]:word[1]})
            if bool(tags):
                return tags
            else:
                return {"INSUFFICIENT_TAG_DATA":0}
        except Exception as e:
            return {"TAG_FAILURE":0}

if __name__ == '__main__':
    sa = SentimentAnalyzer()
    print sa.generateTags('This applies to everything. If you drink alcohol once, it"ll make you drunk. If you drink it every day, your body will start adjusting to compensate for it, and you"ll have a harder and harder time getting drunk. Soon alcohol just brings you up to normal. If you then stop drinking, your body will now be off-balance in the other direction, and you"ll go into withdrawal until homeostasis can be restored. Pain? Similar deal. Your brain tries to maintain homeostasis. Acute, agonized misery is only sustainable for so long. If the pain itself can"t be dulled down, your emotional reaction to it can be. The emergency shutoff switch is when this doesn"t work, and all your emotions are cranked down as far as they can go. That includes distress, pleasure, and fear: basically, it causes apathetic depression. This is why you can"t just expect people to "get used" to severe pain.')