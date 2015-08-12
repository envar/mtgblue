var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schemaOptions = {
    toObject: { virtuals: true },
    toJSON:   { virtuals: true }
};

var cardSchema = new Schema({
    "layout" : String,
    "name": String,
    "names": [String],
    "manaCost" : String,
    "cmc" : Number,
    "colors" : [String],
    "type" : String,
    "supertypes" : [String],
    "types" : [String],
    "subtypes" : [String],
    "rarity" : String,
    "text" : String,
    "flavor" : String,
    "artist" : String,
    "number" : String,
    "power" : String,
    "toughness" : String,
    "loyalty" : Number,
    "multiverseid" : Number,
    "variations" : [Number],
    "imageName" : String,
    "watermark" : String,
    "border" : String,
    "timeshifted" : Boolean,
    "hand" : Number,
    "life" : Number,
    "reserved" : Boolean,
    "releaseDate" : String,
    "starter" : Boolean
}, schemaOptions);

cardSchema.virtual('imageurl').get(function () {
    return "http://api.mtgdb.info/content/card_images/"+this.multiverseid+".jpeg"
});

var Card = mongoose.model('Card', cardSchema);

module.exports = Card
