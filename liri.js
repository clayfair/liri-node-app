
require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
// var Spotify = require("")
var request = require('request');
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];


//--------------------------------------- 1. GET TWEETS ------------------------------------------------
//still working on getting Twitter API working...

function readTweets() {
    if (command === "my-tweets") {

        var params = { screen_name: 'klayanthony1' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
        });

    }
}

readTweets();


//--------------------------------------- 2. GET SPOTIFY INFO --------------------------------------------
//still working on getting Spotify API working...

function getSongInfo() {

    // if (command === "spotify-this-song") {

    // }
}

//getSongInfo();


//---------------------------------------3. GET MOVIE INFO -----------------------------------------------

function getMovieInfo() {
    // var movie = encodeURI(process.argv[2]);
    if (command === "movie-this") {
        var nameHere = process.argv.slice(3);
        var movie = nameHere.join("+");
        // Then run a request to the OMDB API with the movie specified
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            var data = JSON.parse(body);
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                console.log("Title: " + data.Title);
                console.log("Year: " + data.Year);
                console.log("Starring: " + data.Actors);
                console.log("Plot: " + data.Plot);
                console.log("IMDB Rating: " + data.imdbRating);
                console.log("Rotten Tomatoes Score: " + data.Ratings[1].Value);
                console.log("Production: " + data.Country);
                console.log("Language: " + data.Language);
            }
        });

    } else {
        console.log("invalid command");
    }
}

getMovieInfo();

