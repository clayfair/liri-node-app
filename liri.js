
require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
// var Spotify = require("")
var request = require('request');
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


var command = process.argv[2];
var nameHere = process.argv[3];

// function readTweets() {
//     if (command === "my-tweets") {
//         //read 20 tweets of mine
//         console.log("hello");
//     }
// }

// readTweets();


// function getSongInfo() {
//     if(command === "spotify-this-song") {

//     }
// }

function getMovieInfo() {
    // var movie = encodeURI(process.argv[2]);
    if (command === "movie-this") {
        // Then run a request to the OMDB API with the movie specified
        request("http://www.omdbapi.com/?t=" + nameHere + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            var data = JSON.parse(body);
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                //console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                // console.log("The movie's title is: " + JSON.parse(body).imdbRating);
            
                
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