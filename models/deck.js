var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var deckSchema = new Schema({
    "name": String,
    "cards": [{type: mongoose.Schema.ObjectId, ref : 'Card'}]
});

var Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
