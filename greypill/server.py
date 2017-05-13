import rssfeedinterface
import sentimentanalyzer

from flask import Flask
from flask import jsonify
app = Flask(__name__)

'''
@app.route("/")
def hello():
    return "Hello World!"
'''

@app.route("/top_entries")
def top_entries():
    
    feed = rssfeedinterface.RssFeedInterface('https://streemian.com/rss/')
    analyzer = sentimentanalyzer.SentimentAnalyzer()
    
    data = []
    for entry in feed.get_feed_entries():
        data.append(analyzer.getSentiment(entry['summary_detail']['value']))
    
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
    