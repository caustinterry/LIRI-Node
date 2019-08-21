require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var input = process.argv;
var arg1 = input[2];
var output;

console.log("What's up!");

switch (arg1) {
  case "concert-this":
    concerts();
    break;

  case "spotify-this-song":
    music();
    break;

  case "movie-this":
    movies();
    break;

  case "do-what-it-says":
    says();
    break;

  default:
    outputNum = "Not a valid argument";
}

function concerts() {
  console.log("Concerts!");
  var artist = "";

  for (var j = 3; j < input.length; j++) {
    if (j > 3 && j < input.length) {
      artist = artist + "+" + input[j];
    } else {
      artist += input[j];
    }
  }

  var concertQueryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(concertQueryUrl)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function music() {
  console.log("Music!");
}

function movies() {
  console.log("Movies!");
  var movieName = "";

  for (var i = 3; i < input.length; i++) {
    if (i > 3 && i < input.length) {
      movieName = movieName + "+" + input[i];
    } else {
      movieName += input[i];
    }
  }

  var movieQueryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(movieQueryUrl).then(function(response) {
    console.log(response.data);
  });
}

function says() {
  console.log("Do waht it says!");
}
