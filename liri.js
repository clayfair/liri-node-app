require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require("")
var Request = require('request');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var process.argv[2]