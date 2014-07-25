var request     = require('request');

module.exports.controller = function(app) {

  app.get('/artists', function(req, res) {
    if(req.session.isAuthenticated) {
      res.render('artists_view', {userData: req.session.userData, artists: true});
    } else {
      res.render('login_view', {layout: false})
    }
  });

  app.get('/artists/:artist', function(req, res) {
    if(req.session.isAuthenticated) {
      artistName = req.params.artist;
      request.get("http://developer.echonest.com/api/v4/artist/search?api_key=W6OQCEBYKIZKXU04G&name="+artistName+"&results=1&bucket=id:spotify", function(error, response, body) {
        artistData = JSON.parse(body);
        artistId = artistData.response.artists[0].foreign_ids[0].foreign_id;
        res.render('artists_view', {userData: req.session.userData, artistID: artistId, artists: true});
      });
    } else {
      res.render('login_view', {layout: false})
    }
  });
}
