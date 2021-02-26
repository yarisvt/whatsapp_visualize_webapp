from datetime import datetime
import json

import pandas as pd
from flask import Blueprint, jsonify, request

from utils import get_data_per_month, get_data_from_database

api = Blueprint('api', __name__)


@api.route("/api/total-messages-per-person", methods=["GET"])
def total_messages_per_person():
    df = get_data_from_database()
    data = df.groupby(["name", pd.Grouper(key='date', freq='M')]).size()
    json_data = get_data_per_month(data)

    return jsonify({"data": json_data})

@api.route("/api/average-characters-per-message", methods=["GET"])
def average_characters_per_message():
    # TODO fix this to work per month
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
    
    data = df[data].groupby(["name", pd.Grouper(key='date', freq='M')]).size()
    json_data = get_data_per_month(data)
    return jsonify({"words": ", ".join(words), "data": json_data}), 200