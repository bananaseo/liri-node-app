require("dotenv").config();

var spotify = new Spotify(keys.spotify);var client = new Twitter(keys.twitter);

var fs = require("fs"); 
var request = require("request"); 

var action = process.argv[2]; 

//twitter api, spoify api, omdb api

//make sure to do npm install 

// 3. To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

//    * [Twitter](https://www.npmjs.com/package/twitter)
   
//    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
//    * [Request](https://www.npmjs.com/package/request)

//      * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

//    * [DotEnv](https://www.npmjs.com/package/dotenv)

//You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

//twitter

//spotify

//omdb
request("http://www.omdbapi.com/?t="+ movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {
   
    console.log(JSON.parse(body).Actors);

  }
});

//commands

switch (action) {
    //This will show your last 20 tweets and when they were created at in your terminal/bash window.
    case "my-tweets":
      myTweets();
      break;
    
    //This will show information about the song in your terminal/bash window
    case "spotify-this-song":
      spotifyThisSong();
      break;
    
    //This will input movie info
    case "movie-this":
      movieThis();
      break;
    
    //Liri will take the text inside of random.txt and then use it to all Liri's commands  
    case "do-what-it-says":
      doWhatItSays();
      break;
    }