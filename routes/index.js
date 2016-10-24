var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(!req.session.user);
  if (!req.session.user) {
    res.render('login', { title: 'Авторизоваться' });
  } else {
    res.render('chat', { title: 'Чат', user: req.session.user });
  }
});
router.post('/login', require('./login').post);
router.post('/logout', require('./logout').post);

module.exports = router;
