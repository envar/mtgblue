var express = require('express');
var router = express.Router();
var Card = require('../../models/card');

/* GET home page. */
router.get('/', function(req, res) {
    name = req.param('name') || '';

    Card.find({
        name: { $regex: name, $options: 'i' }
    }).limit(10).exec(function (err, cards) {
        if (err) {
            console.log(err);
        }
        res.json(cards);
    });
});

router.post('/', function(req, res) {
    res.json([]);
});

module.exports = router;
