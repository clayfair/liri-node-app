
require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];


//--------------------------------------- 1. GET TWEETS ------------------------------------------------
function readTweets() {
    if (command === "my-tweets") {

        var params = { screen_name: 'klayanthony1' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error) {
                console.log(error);
            } else {
                for (var i = 0; i < tweets.length; i++) {
                    console.log("Tweet: " + tweets[i].text);
                    console.log("Date: " + tweets[i].created_at.substring(0, 19));
                    // console.log("Date: " + date.substring());
                }
            }
        });
    }
}

readTweets();


//--------------------------------------- 2. GET SPOTIFY INFO --------------------------------------------
//LAST TASK: how do I get this string into a query ...

function getSongInfo() {

    if (command === "spotify-this-song") {
        var myQuery = process.argv.slice(3);

        spotify.search({ type: 'track', query: myQuery }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                //name of the track
                var trackName = data.tracks.items[0].name;
                console.log("Track: " + trackName);
                
                //name of the artist
                var artist = data.tracks.items[0].artists[0].name;
                console.log("Artist: " + artist);

                //name of the album 
                var album = data.tracks.items[0].album.name;
                console.log("Album: " + album);
                
                //preview link
                var link = data.tracks.items[0].uri;
                console.log("Preview link: " + link);
            
            }
        });
    }
}

getSongInfo();


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

    }
}

getMovieInfo();

