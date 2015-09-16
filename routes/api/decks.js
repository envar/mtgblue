var express = require('express');
var router = express.Router();
var Deck = require('../../models/deck');

/* GET Decks */
router.get('/', function(req, res) {
    var name = req.param('name') || '';

    Deck.find({
        name: { $regex: name, $options: 'i' }
    }).exec(function (err, decks) {
        if (err) {
            return console.error(err);
        }
        res.json(decks);
    });
});

/* POST Decks */
router.post('/', function(req, res) {
    var deck = new Deck(req.body);
    deck.save(function(err, deck) {
        if (err) {
            return console.error(err);
        }
        res.json(deck);
    });
});

/* PUT Decks */
router.put('/:id', function(req, res) {
    Deck.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, deck) {
        if (err) {
            return console.err(err);
        }
        res.json(deck);
    });
});

/* DELETE Decks */
router.delete('/:id', function(req, res) {
    Deck.findByIdAndRemove(req.params.id, function(err, deck) {
        if (err) {
            return console.err(err);
        }
        res.json(deck);
    });
});

module.exports = router;
