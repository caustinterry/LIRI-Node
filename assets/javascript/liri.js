require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

console.log("What's up!");
