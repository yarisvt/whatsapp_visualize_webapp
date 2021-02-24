from datetime import datetime
import json

import pandas as pd
from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__)


def get_data_from_database():
    df = pd.read_csv("api/database.tsv", sep="\t")
    df.date = pd.to_datetime(df.date, format="%Y-%m-%d %H:%M:%S")
    return df

@api.route("/api/total-messages-per-person", methods=["GET"])
def total_messages_per_person():
    df = get_data_from_database()
    json_data =  json.loads(df.groupby(["name"]).size().to_json())

    return jsonify({"data": json_data})

@api.route("/api/average-characters-per-message", methods=["GET"])
def average_characters_per_message():
    df = get_data_from_database()
    json_data = json.loads(df.groupby(["name"])["full_message"].apply(
        lambda x: sum([len(i) for i in x]) / len(x)).to_json())

    return jsonify({"data": json_data})

@api.route("/api/get-by-word", methods=["GET"])
def find_by_word():
    df = get_data_from_database()
    args_word = request.args.get("words")

    if "," in args_word:
        words = [x.lower().strip() for x in args_word.split(",")]
    else:
        words = [args_word.lower().strip()]

    data = df["message"].apply(lambda x: any(
        item for item in words if item in x))

    json_data = json.loads(df[data].groupby(["name"]).size().to_json())
    return jsonify({"word": ", ".join(words), "data": json_data}), 200