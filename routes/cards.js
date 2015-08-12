var express = require('express');
var router = express.Router();
var Card = require('../models/card');

/* GET home page. */
router.get('/', function(req, res) {
    name = req.param('name')

    Card.find({
        name: { $regex: name, $options: 'i' }
    }).limit(10).exec(function (err, cards) {
        res.render('cards', {user: req.session.user, cards: cards});
    });
});

module.exports = router;
