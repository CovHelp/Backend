import csc from 'country-state-city'
var express = require('express')
var router = express.Router()

router.get('/states', (req, res) => {
    const states = csc.getStatesOfCountry('IN');
    res.status(200).send(states);
})

router.get('/cities/:state', (req, res) => {
    const state = req.params.state; 
    const cities = csc.getCitiesOfState('IN', state);
    res.status(200).send(cities);
})

module.exports = router
