import rssfeedinterface

from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/top_entries")
def top():
    feed = rssfeedinterface.RssFeedInterface('https://streemian.com/rss/')
    return str(feed.get_feed_entries())

if __name__ == "__main__":
    app.run(debug=True)
    