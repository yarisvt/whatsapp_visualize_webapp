from flask import Flask, render_template, request, jsonify

from api import api

app = Flask(__name__)
app.register_blueprint(api)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
