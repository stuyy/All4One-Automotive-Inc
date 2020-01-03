const router = module.exports = require('express').Router();
const KEY = `${process.env.WEATHER_API}`;
const fetch = require('node-fetch');
const WeatherStore = require('../utils/WeatherStore');
const store = new WeatherStore({ time: 120000 });

function check(req, res, next) {
    let param = req.params.city || req.params.postal || req.params.id;
    if(param) {
        let value = store.get(param);
        if(value) {
            console.log("Sending cached data.");
            res.send(value).end()
        }
        else
            next();
    }
    else if(req.params.lat && req.params.lon) {
        let { lat, lon } = req.params;
        let key = lat + lon;
        let value = store.get(key);
        if(value) {
            console.log("Sending cached data.");
            res.send(value).end();
        }
        else {
            req.latlon = key;
            next();
        }
    }
    else
        res.status(500).end();
}
router.get('/coordinates/:lat/:lon', check, async (req, res) => {
    let url = parseUrl('coordinates', req.params.lat, req.params.lon);
    try {
        let weather = await (await fetch(url)).json();
        if(weather.cod !== 200) throw new Error("Invalid request.");
        store.put(req.latlon, weather);
        res.send(weather).end();
        console.log(store);
    }
    catch(err) {
        res.status(400).json({ msg: "Invalid request. "})
    }
});

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

router.get('/postal/:postal', check, async (req, res) => {
    let url = parseUrl('postal', req.params.postal);    
    try {
        let weather = await (await fetch(url)).json();
        if(weather.cod !== 200) throw new Error("Invalid request.");
        store.put(req.params.postal, weather);
        res.send(weather);
    }
    catch(err) {
        res.status(400).json({ msg: "Invalid request."});
    }
});

router.get('/id/:id', check, async (req, res) => {
    let url = parseUrl('id', req.params.id);    
    try {
        let weather = await (await fetch(url)).json();
        if(weather.cod !== 200) throw new Error("Invalid request.");
        store.put(req.params.id, weather);
        res.send(weather);
    }
    catch(err) {
        res.status(400).json({ msg: "Invalid request."});
    }
})

function parseUrl(type, ...args) {
    if(type === 'city') 
        return `http://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=imperial&appid=${KEY}`;
    else if(type === 'coordinates')
        return `http://api.openweathermap.org/data/2.5/weather?lat=${args[0]}&lon=${args[1]}&units=imperial&appid=${KEY}`;
    else if(type === 'id')
        return `http://api.openweathermap.org/data/2.5/weather?id=${args[0]}&units=imperial&appid=${KEY}`;
    else if(type === 'postal')
        return `http://api.openweathermap.org/data/2.5/weather?zip=${args[0]}&units=imperial&appid=${KEY}`;
}

