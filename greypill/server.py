import rssfeedinterface

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
    return jsonify(feed.get_feed_titles())

if __name__ == "__main__":
    app.run(debug=True)
    