var User = require('../models/user.js');

// show sign up page
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册'
  });
};

// show sign in page
exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录'
  });
};

// show users list
exports.showList = function(req, res) {
  res.send('respond with a resource');
};
