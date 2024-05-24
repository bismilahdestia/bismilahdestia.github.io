from flask import Flask, request, jsonify, render_template
import json
import time
import re
import requests
from urllib.parse import urlparse

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    token = data['token']
    username = data['username']
    urls = data['urls'].split('\n')

    headers = {
        'authorization': token,
        'content-type': 'application/json; charset=utf-8',
    }

    results = []

    for url in urls:
        parsed_url = urlparse(url.strip())
        if not parsed_url.scheme or not parsed_url.netloc:
            continue

        path_parts = parsed_url.path.split("/")
        if len(path_parts) < 3:
            continue

        username = path_parts[1]
        identifier = path_parts[2][:10]

        # Sample API request based on your previous code
        response = requests.get(f"https://client.warpcast.com/v2/user-thread-casts?castHashPrefix={identifier}&username={username}&limit=15", headers=headers)
        result = response.json()
        results.append(result)

        # Add your logic for like, recast, and comment here

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
