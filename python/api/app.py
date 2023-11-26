# api
from flask import Flask
# cache
import redis

r = redis.Redis(host='localhost', port=6379, db=0)

app = Flask(__name__)

@app.route('/v1/superteam')
def index():
    return r.json().get('superteam')