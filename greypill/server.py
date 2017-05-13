import rssfeedinterface
import sentimentanalyzer
from BeautifulSoup import BeautifulSoup

from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

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
    
    bucket_size = 9
    bucket_index = get_bucket_index()
    
    if request.method == 'POST':
        with open('temp/bucket.'+str(bucket_index), 'w+') as f:
            f.write(str(request.get_json()))
        increment_bucket()
        return '200'
    else:
        data = []
        
        for x in range(bucket_size):
            try:
                with open('temp/bucket.'+str(bucket_index), 'r') as f:
                    data.append(f.readlines())
            except Exception as e:
                raise e
                
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

def increment_bucket():
    
    bucket_size = 9
    bucket_index = get_bucket_index()
    
    with open('temp/bucketindex.ddd', 'w') as f:
        if bucket_index >= bucket_size: f.write(str(0))
        else:
            bucket_index += 1
            f.write(str(bucket_index))
        f.truncate()
        
    return

def get_bucket_index():
    bucket_size = 9
    with open('temp/bucketindex.ddd', 'r') as f:
        bucket_index = int(f.read())
    return bucket_index

if __name__ == '__main__':
    app.run(debug=True)
    
