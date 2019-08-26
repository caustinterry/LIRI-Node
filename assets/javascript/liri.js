require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var input = process.argv;
var arg1 = input[2];
var output;

switcheroo();
function errorResponse() {
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
}
function switcheroo() {
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
}

function concerts() {
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
      // console.log(response.data[0]);
      var concertResponse = response.data[0];

      //   * Name of the venue
      console.log("Venue: " + concertResponse.venue.name);
      //  * Venue location
      console.log(
        "Location: " +
          concertResponse.venue.city +
          ", " +
          concertResponse.venue.region
      );
      //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
      console.log("Date: " + concertResponse.datetime);
    })
    .catch(function(error) {
      errorResponse();
    });
}

function music() {
  var songName = "";
  // var songData = response.data.tracks.items[0].album.artists[0].name;

  for (var k = 3; k < input.length; k++) {
    if (k > 3 && k < input.length) {
      songName = songName + "+" + input[k];
    } else {
      songName += input[k];
    }
  }
  if (songName === "") {
    songName = "The Sign";
  }

  spotify
    .search({ type: "track", query: songName })

    .then(function(response) {
      // console.log(response.tracks.items[0].album.artists[0].name);
      var songResponse = response.tracks.items[0];
      // * Artist(s)
      console.log("Artist: " + songResponse.album.artists[0].name);
      // * The song's name
      console.log("Song: " + songResponse.name);
      // * A preview link of the song from Spotify
      console.log("Check out the song: " + songResponse.preview_url);
      // * The album that the song is from
      console.log("Album: " + songResponse.album.name);
    })
    .catch(function(error) {
      errorResponse();
    });
}

function movies() {
  var movieName = "";

  for (var i = 3; i < input.length; i++) {
    if (i > 3 && i < input.length) {
      movieName = movieName + "+" + input[i];
    } else {
      movieName += input[i];
    }
  }
  if (movieName === "") {
    console.log(
      "If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>" +
        "\nIt's on Netflix!"
    );
    movieName = "mr nobody";
  }

  var movieQueryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios
    .get(movieQueryUrl)
    .then(function(response) {
      // console.log(response.data);
      var movieResponse = response.data;
      // * Title of the movie.
      console.log("Title: " + movieResponse.Title);
      // * Year the movie came out.
      console.log("Year Released: " + movieResponse.Year);

      // * IMDB Rating of the movie.
      console.log(movieResponse.Ratings[0].Source);

      // * Rotten Tomatoes Rating of the movie.
      console.log("Title: " + movieResponse.Ratings[1].Source);

      // * Country where the movie was produced.
      console.log("Produced in: " + movieResponse.Country);

      // * Language of the movie.
      console.log("Language: " + movieResponse.Language);

      // * Plot of the movie.
      console.log("Plot: " + movieResponse.Plot);

      // * Actors in the movie.
      console.log("Cast: " + movieResponse.Actors);
    })
    .catch(function(error) {
      errorResponse();
    });
}

function says() {
  console.log("Do what it says!");
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);

    var randomArr = data.split(", ");
    console.log(randomArr);
    arg1 = randomArr[0];
    songName = randomArr[1];
    switcheroo();
  });
}
