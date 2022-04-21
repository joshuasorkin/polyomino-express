var express = require('express');
var router = express.Router();
const Drawing = require('../drawing.js');

const drawing = new Drawing();
drawing.tileAllCanvases();


router.get('/svg', function(req, res, next) {
    res.render('polyomino', { 
        title: 'Polyomino',
        SVGs: drawing.SVGs
    })
    .catch(err => {
        console.log({err});
    });
});

router.get('/png', function(req, res, next) {
    res.render('polyomino', { 
        title: 'Polyomino',
        dataURLs: drawing.dataURLs
    })
    .catch(err => {
        console.log({err});
    });
});


module.exports = router;