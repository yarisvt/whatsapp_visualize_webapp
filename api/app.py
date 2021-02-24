from os import environ
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

from api import api

app = Flask(__name__)
app.register_blueprint(api)

if environ['FLASK_ENV'] is not None and environ['FLASK_ENV'] == 'development':
    print('Enabling CORS')
    CORS(app)    

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
