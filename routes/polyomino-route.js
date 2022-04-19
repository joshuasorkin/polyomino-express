var express = require('express');
var router = express.Router();
const Drawing = require('../drawing.js');

const drawing = new Drawing();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('polyomino', { 
        title: 'Polyomino',
        drawing: drawing
    });
});

module.exports = router;