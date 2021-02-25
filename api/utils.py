import re

import pandas as pd

MONTHS = [i for i in range(1, 13)]

def get_data_from_database():
    df = pd.read_csv("database.tsv", sep="\t")
    df["message"] = df["full_message"].apply(lambda x: re.sub(r"[,.\"'?!]", "", x).lower().split())
    df.date = pd.to_datetime(df.date, format="%Y-%m-%d %H:%M:%S")
    return df

def get_data_per_month(df):
    json_data = {}           
    data = df.groupby(["name", pd.Grouper(key='date', freq='M')]).size()
    for index, value in data.items():
        name = index[0]
        year = index[1].year
        month = index[1].month

        if name not in json_data:
            json_data[name] = {}
        if year not in json_data[name]:
            json_data[name][year] = {}

        json_data[name][year][month] = value
    json_data = fill_missing_values(json_data)

    return json_data

def fill_missing_values(json_data):
    min_year, max_year = get_min_max_year(json_data)
    for year in range(min_year, max_year + 1):
        for name in json_data.keys():
            if year not in json_data[name]:
                json_data[name][year] = {}
            for month in MONTHS:
                if month not in json_data[name][year]:
                    json_data[name][year][month] = 0
    return json_data


def get_min_max_year(json_data):
    min_year = 9999
    max_year = 0
    for key in json_data.keys():
        min_value = min(json_data[key].keys())
        max_value = max(json_data[key].keys())

        if min_value < min_year:
            min_year = min_value
        if max_value > max_year:
            max_year = max_value
    return min_year, max_year