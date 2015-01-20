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

// sign up
exports.signup = function(req, res) {
  console.log(req.body.user);
  var _user = req.body.user;
  console.log(_user);

  User.findOne({name: _user.name}, function(err, user) {
    if (err) {
      console.log(err);
    }

    if (user) {
      return res.redirect('/signin');
    } else {
      user = new User(_user);

      user.save(function(err, user) {
        if (err) {
          console.log(err);
        }
        res.redirect('/');
      });
    }
  });
};
