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
  var _user = req.body.user;

  if (_user.repeatPassword !== _user.password) {
    return res.redirect('/signup');
  }

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

// sign in
exports.signin = function(req, res) {
  var _user = req.body.user;
  var name = _user.name;
  var pwd = _user.password;
  console.log(_user);

  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err);
    }

    if (!user) {
      res.redirect('/signup');
    } else {
      user.comparePassword(pwd, function(err, isMatch) {
        if (err) {
          console.log(err);
        }

        if (!isMatch) {
          return res.redirect('/signin');
        } else {
          req.session.user = user;
          return res.redirect('/');
        }
      });
    }
  });
};

// logout
exports.logout = function(req, res) {
  delete req.session.user;
  res.redirect('/');
};

// midware for check user
exports.signinRequired = function(req, res) {
  var user = req.session.user;

  if (!user) {
    return res.redirect('/signin');
  }

  next();
};

