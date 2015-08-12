import json
import pymongo
db = pymongo.MongoClient('localhost', 27017).mtg

with open('AllCards.json') as f:
    data = json.load(f)

cards = [v for k, v in data.items()]

db.cards.insert_many(cards)
