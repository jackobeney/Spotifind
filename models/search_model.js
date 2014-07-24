var request      = require('request');
var async        = require('async');

search_model = {
  getSearchData: function(searchValue){
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
      }
    ], function (err, result) {
    });
  }
}

module.exports = search_model;