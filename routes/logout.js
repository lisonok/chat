exports.post = function(req, res) {
  console.log('logout server');
  req.session.destroy();
  res.send({});
};
