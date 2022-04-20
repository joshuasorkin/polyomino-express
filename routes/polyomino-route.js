var express = require('express');
var router = express.Router();
const Drawing = require('../drawing.js');

const drawing = new Drawing();
drawing.tileAllCanvases();
//console.log(drawing.config);
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('polyomino', { 
        title: 'Polyomino',
        dataURLs: drawing.dataURLs
    });
});

module.exports = router;