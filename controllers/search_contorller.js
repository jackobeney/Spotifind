var request      = require('request');
var async        = require('async');
var search_model = require('../models/search_model');

module.exports.controller = function(app) {

app.get('/search/:searchterm', function(req, res) {
    if(req.session.isAuthenticated) {
      searchValue = req.params.searchterm;
      var artistData;
      async.waterfall([
        function(cb){
          request.get("http://developer.echonest.com/api/v4/artist/similar?api_key=W6OQCEBYKIZKXU04G&name="+searchValue+"&bucket=id:spotify", function(error, response, body) {
            artistData = JSON.parse(body);
            cb(null);
          });
        },
        function(cb){
          if(artistData.response.status.code == 5) {
            artistData.response.noResults = true;
            cb(null);
          } else {
            artistData.response.noResults = false;
            async.eachLimit(Object.keys(artistData.response.artists), 15, function(key, callback){
              artist = artistData.response.artists[key];
              artistID = artist.foreign_ids[0].foreign_id.substr(-22);
              request.get("https://api.spotify.com/v1/artists/"+artistID, function(error, response, body) {
                imageData = JSON.parse(body);
                artistData.response.artists[key].imageUrl = imageData.images[1].url;
                callback();
              });
            }, function(err){
              cb(null);
            })
          }
        },
        function(cb){
          req.session.searchData = artistData.response
          res.render('dashboard_view', {userData: req.session.userData, searchTerm: req.params.searchterm, home: true, searchData: artistData.response});
        }
      ], function (err, result) {
      });

      request.get("http://developer.echonest.com/api/v4/artist/images?api_key=W6OQCEBYKIZKXU04G&name="+searchValue+"&results=1", function(error, response, body) {
        image = JSON.parse(body);
      });
    } else {
      res.render('login_view', {layout: false})
    }
  });
}