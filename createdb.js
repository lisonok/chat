var mongoose = require('./mongoose');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

  console.log("CONNECT");

  require('./model/user');

  var user = new mongoose.models.User({
    login: "Tester2",
    password: "secret"
  });
});
