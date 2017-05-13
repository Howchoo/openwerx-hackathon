import rssfeedinterface
import sentimentanalyzer

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
        data.append(analyzer.getSentiment(entry['summary_detail']['value']))
    
    return jsonify(data)

@app.route('/analyze_this', methods=['POST'])
def analyze_this():
    
    data = []
    for sentence in request.get_json()['sentences']:
        data.append(analyzer.getSentiment(sentence))
        
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    