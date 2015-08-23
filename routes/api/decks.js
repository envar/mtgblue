var express = require('express');
var router = express.Router();
var Deck = require('../../models/deck');

/* GET Decks */
router.get('/', function(req, res) {
    name = req.param('name')

    Deck.find().limit(10).populate('cards').exec(function (err, decks) {
        if (err) {
            console.log(err);
        }
        res.json(decks);
    });
});

module.exports = router;
