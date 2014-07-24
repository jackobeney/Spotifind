module.exports.controller = function(app) {

app.get('/login', function(req, res) {
    res.render('login_view', {layout: false});
  });

   app.get('/logout', function(req, res) {
    req.session.isAuthenticated = false;
    req.session.userData = null;
    req.session.playlistData = null;
    res.render('login_view', {layout: false});
  });

}