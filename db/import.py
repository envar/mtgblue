import json
import pymongo
import sys
db = pymongo.MongoClient('localhost', 27017).mtg

with open('AllSets.json') as f:
    data = json.load(f)

for set in data:
    db.cards.insert_many(data[set]['cards'])

