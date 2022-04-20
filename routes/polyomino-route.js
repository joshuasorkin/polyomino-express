var express = require('express');
var router = express.Router();
const Drawing = require('../drawing.js');

const drawing = new Drawing();
drawing.tileAllCanvases();

router.get('/', function(req, res, next) {
    res.render('polyomino', { 
        title: 'Polyomino',
        dataURLs: drawing.dataURLs,
        SVGs: drawing.SVGs
    })
    .catch(err => {
        console.log({err});
    });
});

module.exports = router;