import rssfeedinterface
import sentimentanalyzer
import json
import requests
import util

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
    
    data = {}
    for sentence in request.get_json()['sentences']:
        data.update(analyzer.getSentiment(sentence))
        
    return jsonify(data)

@app.route('/mastodonfeed', methods=['GET', 'POST'])
def handle_mastodon_feed():
    
    bucket_size = 9
    bucket_index = get_bucket_index()
    
    if request.method == 'POST':
        with open('temp/bucket.'+str(bucket_index)+'.json', 'w+') as f:
            f.write(json.dumps(request.get_json()))
        increment_bucket()
        return '200'
    else:
        data = []
        for x in range(bucket_size):   
            with open('temp/bucket.'+str(x)+'.json', 'r') as f:
                status = json.loads(f.read())
                
            cleaned_summary = BeautifulSoup(status['account']['note']).text
            summary = cleaned_summary
            try:
                translated_status = translate(cleaned_summary).json()['data']
                translated_summary = translated_status['translations'][0]['translatedText']
                detected_language = translated_status['translations'][0]['detectedSourceLanguage']
                summary = translated_summary
            except Exception as e:
                print e
                summary = cleaned_summary
                detected_language = 'translation_failed'
            
            jsondata = [{
                'data_source': 'mastodon',
                'created_at': status['created_at'],
                'title': status['account']['username'],
                'url': status['account']['url'],
                'summary_detail': summary,
                'source_language': detected_language,
                'sentiment': analyzer.getSentiment(summary),
                'generated_tags': analyzer.generateTags(summary, num_tags=2, weight=1)
            }]
            data.append(jsondata)
                
        return jsonify(data)

def construct_json(entry):
    
    cleaned_summary = BeautifulSoup(entry['summary_detail']['value']).text
    summary = cleaned_summary
    try:
        translation_data = translate(cleaned_summary).json()['data']
        translated_summary = translation_data['translations'][0]['translatedText']
        detected_language = translation_data['translations'][0]['detectedSourceLanguage']
        summary = translated_summary
    except Exception as e:
        print e
        summary = cleaned_summary
        detected_language = 'translation_failed'
    
    jsondata = [{
        'data_source': 'streemit',
        'created_at': entry['published'],
        'title': entry['title'],
        'url': entry['link'],
        'summary_detail': summary,
        'source_language': detected_language,
        'sentiment': analyzer.getSentiment(summary),
        'generated_tags': analyzer.generateTags(summary)
    }]
    
    return jsondata

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

def translate(paragraph, lang='en'):
    key = util.get_config_value('googleTranslateApiKey')
    r = requests.get('https://www.googleapis.com/language/translate/v2', params={'target': lang, 'key': key, 'q': paragraph, 'format': 'text'})
    #print r.status_code
    return r

if __name__ == '__main__':
    app.run(debug=True)
    
