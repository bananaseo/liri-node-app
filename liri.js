require("dotenv").config();

var key = require("./key.js"); 
var request = require("request"); 
var inquirer = require ("inquirer"); 
var fs = require ("fs"); 

//Twitter------------------------
var Twitter = require("twitter"); 
var client = new Twitter(key.twitter);
var params = {screen_name: 'NaSeo6'}; 

//Spotify-------------------------
var Spotify = require("node-spotify-api");
var spotify = new Spotify(key.spotify);
//var songTitle = process.argv[2];


  inquirer.prompt ([
    {
      type: "input", 
      name: "liriBot",
      message: "What would you like to do?"
      

    }
  ]).then(function(user){
    if (user.liriBot === "my-tweets") {
      
      client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
    
          for (i = 0; i < tweets.length; i++) {
            console.log(`Tweet : ${tweets[i].text}`);
            console.log(`Created : ${tweets[i].created_at}`);
            console.log("============================")
          };
        }
      });
    }

    else if (user.liriBot === "spotify-this-song") {
      inquirer.prompt([
        {
          type:"input",
          name: "inputSong",
          message: "Which song?"
        }
      ]).then(function(user2){
        var songTitle = "'"+user2.inputSong+"'"; 
        
          spotify.search({ type: 'track', query: songTitle, limit: 1 }, function (err, data) {
          
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log("Artist: "+ JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
            console.log("Song Link: "+ JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
          });
      })
    }

    else if (user.liriBot === "movie-this") {
      inquirer.prompt([
        {
          type:"input",
          name: "inputMovie",
          message: "Which movie?"
        }
      ]).then(function(user3){
        

            //Omdb------------------------------------------
            var nodeArgs = process.argv; 
            var movieName = "'"+user3.inputMovie+"'";

            for (var i = 2; i < nodeArgs.length; i++) {

              if (i > 2 && i < nodeArgs.length) {

                movieName = movieName + "+" + nodeArgs[i];

              }

              else {

                movieName += nodeArgs[i];

              }
            }
            var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            request(movieQueryUrl, function(error, response, body){
              if (!error && response.statusCode === 200) {
              
                console.log("Title: " +JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Ratings: " +JSON.parse(body).Ratings[0].Value);
                console.log("Rotten Tomatoes Ratings: " +JSON.parse(body).Ratings[1].Value);
                console.log("Country: " +JSON.parse(body).Country);
                console.log("Language: " +JSON.parse(body).Language);
                console.log("Plot: " +JSON.parse(body).Plot);
                console.log("Actors: " +JSON.parse(body).Actors);
            }})
        
          
      })
    }

   else if (user.liriBot === "do-what-it-says") {
      //read text-----------------------------------------
      fs.readFile("random.txt", "utf8", function(error,data) {
        if (error) {
          return console.log(error); 
        }
        var dataArr = data.split(","); 
        console.log(dataArr[1]); 
        spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function (err, data) {
          
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          console.log("Artist: "+ JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
          console.log("Song Link: "+ JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
        });
        

      })
   } 
   
   
    
  })
  




