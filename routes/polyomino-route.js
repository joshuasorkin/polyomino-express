var express = require('express');
var router = express.Router();
const Drawing = require('../drawing.js');
const fs = require('fs');

const drawing = new Drawing();
drawing.tileAllCanvases();
fs.writeFileSync('polyomino.svg',drawing.SVGs[0]);

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

router.get('/svg_download', function (req,res,next) {
    res.download('polyomino.svg',function(err){
        console.log(`error downloading file: ${err}`);
    })
});

module.exports = router;