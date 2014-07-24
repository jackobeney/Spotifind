module.exports.controller = function(app) {

  app.get('/', function(req, res) {
    if(req.session.isAuthenticated) {
      res.render('dashboard_view', {userData: req.session.userData, home: true});
    } else {
      res.render('login_view', {layout: false})
    }
  });

}

