const router = module.exports = require('express').Router();
const KEY = `${process.env.WEATHER_API}`;
const fetch = require('node-fetch');
const WeatherStore = require('../utils/WeatherStore');
const store = new WeatherStore({ time: 120000 });

router.get('/coordinates/:lat/:lon', (req, res) => {

});

function check(req, res, next) {
    let value = store.get(req.params.city);
    if(value) {
        console.log("Sending cached data.");
        res.send(value).end()
    }
    else
        next();
}
router.get('/city/:city', check, async (req, res) => {
    let url = parseUrl('city', req.params.city);
    try {
        let weather = await (await fetch(url)).json();
        if(weather.cod !== 200) throw new Error("Invalid request.");
        store.put(req.params.city, weather);
        res.send(weather).end();
    }
    catch(err) {
        res.status(400).json({ msg: "Invalid request. "})
    }
});

router.get('/postal/:postal', (req, res) => {
    let url = parseUrl('postal', req.params.postal);
});

function parseUrl(type, ...args) {
    if(type === 'city') 
        return `http://api.openweathermap.org/data/2.5/weather?q=${args[0]}&appid=${KEY}`;
    else if(type === 'coordinates')
        return `http://api.openweathermap.org/data/2.5/weather?lat=${args[0]}&lon=${arg[1]}&appid=${KEY}`;
    else if(type === 'id')
        return `http://api.openweathermap.org/data/2.5/weather?id=${args[0]}&appid=${KEY}`;
    else if(type === 'postal')
        return `http://api.openweathermap.org/data/2.5/weather?zip=${args[0]}&appid=${KEY}`;
}