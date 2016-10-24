var User = require('../model/user').User;
var async = require('async');

exports.post = function(req, res, next) {
  var login = req.body.login;
  var password = req.body.password;

  User.authorize(login, password, function(err, user) {
    if (err) {
      res.status(403).send('');
    } else {
      req.session.user = user.login;
      res.send({});
    }
  });
}
