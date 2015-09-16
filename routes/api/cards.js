var express = require('express');
var router = express.Router();
var Card = require('../../models/card');

router.get('/', function(req, res) {
    var name = req.param('name');
    if (name)  {
        Card.find({
            name: { $regex: name, $options: 'i' }
        }).limit(10).exec(function (err, cards) {
            if (err) {
                console.log(err);
            }
            return res.json(cards);
        });
    } else {
        Card.find().limit(10).exec(function (err, cards) {
            if (err) {
                console.log(err);
            }
            return res.json(cards);
        });
    }
});

module.exports = router;
