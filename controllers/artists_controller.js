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
      res.render('artists_view', {userData: req.session.userData, searchData: req.session.searchData, artistName: req.params.artist, artists: true});
    } else {
      res.render('login_view', {layout: false})
    }
  });
}
