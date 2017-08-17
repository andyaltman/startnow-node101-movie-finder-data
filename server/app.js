const express = require('express');
var morgan = require('morgan');
var axios = require('axios');

const app = express();

var cache = {};

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

app.get('/', function (req, res) {
    var key = req.url.substring(2);
    if (!cache[key]) {
        // console.log('http://www.omdbapi.com/?' + key + '&apikey=8730e0e');
        axios.get('http://www.omdbapi.com/?' + key + '&apikey=8730e0e')
            .then(function (response) {
                cache[key] = response.data;
                console.log("Key was not in the cache, so I got movie data, added it to the cache, and sent it");
                res.json(cache[key]);
                console.log(cache[key]);
            });
    } else {
        res.json(cache[key]);
        console.log("Key was in the cache, so I sent the data");
        console.log(cache[key]);
    }
});

app.listen(3000, function () {
    console.log("Listening at port Localhost:3000");
});

module.exports = app;