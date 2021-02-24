from flask import Flask, render_template, request, jsonify

from api.api import api

app = Flask(__name__)
app.register_blueprint(api)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/total-messages-per-person")
def total_messages_per_person():
    return render_template("index.html")

@app.route("/average-characters-per-message")
def average_characters_per_message():
    return render_template("index.html")

@app.route("/get-by-word")
def get_by_word():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
