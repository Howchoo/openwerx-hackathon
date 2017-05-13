import rssfeedinterface
import sentimentanalyzer
from BeautifulSoup import BeautifulSoup

from flask import Flask
from flask import jsonify
from flask import request
app = Flask(__name__)

feed = rssfeedinterface.RssFeedInterface('https://streemian.com/rss/')
analyzer = sentimentanalyzer.SentimentAnalyzer()

@app.route('/top_entries')
def top_entries():
    
    data = []
    for entry in feed.get_feed_entries():
        data.append(construct_json(entry))
    
    return jsonify(data)

@app.route('/analyze_this', methods=['POST'])
def analyze_this():
    
    data = []
    for sentence in request.get_json()['sentences']:
        data.append(analyzer.getSentiment(sentence))
        
    return data

def construct_json(entry):
    
    data = []
    
    cleaned_summary = BeautifulSoup(entry['summary_detail']['value']).text
    
    title = {'title': entry['title']}
    summary = {'summary_detail': cleaned_summary}
    sentiment = {'sentiment': analyzer.getSentiment(cleaned_summary)}
    
    data.append(title)
    data.append(summary)
    data.append(sentiment)
    
    return data

if __name__ == '__main__':
    app.run(debug=True)
    