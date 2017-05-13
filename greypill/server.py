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

@app.route('/mastodonfeed', methods=['GET', 'POST'])
def handle_mastodon_feed():
    
    '''
    mastodon_bucket_size = 10
    mastodon_bucket_index = 0
    mastodon_bucket = [None for x in range(mastodon_bucket_size)]
    '''
    
    if request.method == 'POST':
        mastodon_bucket[mastodon_bucket_index] = request.get_json()
        if mastodon_bucket_index < mastodon_bucket_size: mastodon_bucket_index += 1
        else: mastodon_bucket_index = 0
        return '200'
    else:
        return jsonify(mastodon_bucket)

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
    
    global mastodon_bucket_size
    global mastodon_bucket_index
    global mastodon_bucket
    
    mastodon_bucket_size = 10
    mastodon_bucket_index = 0
    mastodon_bucket = [None for x in range(mastodon_bucket_size)]
    
    app.run(debug=True)
    
