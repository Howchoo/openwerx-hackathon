import json


def get_config_value(value):

    with open('config.json') as data_file:
        data = json.load(data_file)

    return data[value]