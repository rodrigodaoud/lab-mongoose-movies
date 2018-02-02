

const express = require('express');
const Celebrity = require('../models/celebrity')

const router = express.Router();

router.get('/', (req, res, next) => {
    Celebrity.find({}, (err, celebrities) => {
        if(err){
            return next(err);
        }
        let data = {
            celebrities: celebrities
        };
        res.render('celebrities/index', data);
    });
});

router.get('/new', (req, res, next) => {
    res.render('celebrities/new');
});

router.post('/', (req, res, next) => {
    const createCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    };
    const newCelebrity = new Celebrity(createCelebrity);

    newCelebrity.save((err) => {
        if(err){
            next(err);
        }
        else{
            res.redirect('/celebrities');
        }
    });
});

module.exports = router;