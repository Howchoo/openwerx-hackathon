import rssfeedinterface
import sentimentanalyzer
from BeautifulSoup import BeautifulSoup

from flask import Flask
from flask import jsonify
from flask import request
app = Flask(__name__)

base_feed_url = 'https://streemian.com/rss/'
feed = rssfeedinterface.RssFeedInterface(base_feed_url)
analyzer = sentimentanalyzer.SentimentAnalyzer()

@app.route('/most_recent')
def most_recent():
    
    feed.refresh_feed()
    
    data = []
    for entry in feed.get_feed_entries():
        data.append(construct_json(entry))
    
    return jsonify(data)

@app.route('/by_tag', methods=['POST'])
def by_tag():

    tag = request.get_json()['tag']
    feed = rssfeedinterface.RssFeedInterface(base_feed_url + tag)
    
    feed.refresh_feed()
    
    data = []
    for entry in feed.get_feed_entries():
        data.append(construct_json(entry))
    
    return jsonify(data)

@app.route('/analyze_this', methods=['POST'])
def analyze_this():
    
    data = []
    for sentence in request.get_json()['sentences']:
        data.update(analyzer.getSentiment(sentence))
        
    return jsonify(data)

def construct_json(entry):
    
    data = []
    
    cleaned_summary = BeautifulSoup(entry['summary_detail']['value']).text
    
    json = [{
        'title': entry['title'],
        'summary_detail': cleaned_summary,
        'sentiment': analyzer.getSentiment(cleaned_summary)
    }]
    
    return json

if __name__ == '__main__':
    app.run(debug=True)
    
