var request     = require('request');

module.exports.controller = function(app) {

  app.get('/playlists', function(req, res) {
    if(req.session.isAuthenticated) {
      var userData = req.session.userData;

      var options = {
        url: 'https://api.spotify.com/v1/users/' + userData.id + '/playlists',
        headers: { 'Authorization': 'Bearer ' + req.session.accessToken },
        json: true
      };

      request.get(options, function(error, response, body) {
        req.session.playlistData = body;
        res.render('playlists_view', {userData: req.session.userData, playlistData: req.session.playlistData, playlists: true});
      });
    } else {
      res.render('login_view', {layout: false});
    }

  });
}