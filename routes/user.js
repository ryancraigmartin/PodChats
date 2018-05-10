const express = require('express');
let router = express.Router();
const  { User } = require('../models'); 

router.get('/', (req, res) => {
    User.find({}, (err, User) => {
        res.json(User)
    })
})

router.get('/:id/', (req, res) => {
    User.findById(req.params.id, (err, User) => {
        res.json(User)
    })
})

router.post('/', (req, res) => {
    User.create(req.body, (err, User) => {
        res.json(User)
    })
})

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, User) => {
        res.json(User)
    })
})

module.exports = router;