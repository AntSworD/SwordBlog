var User = require('../models/user.js');

// show sign up page
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册',
    error: req.flash('error'),
    success: req.flash('success')
  });
};

// show sign in page
exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录',
    error: req.flash('error'),
    success: req.flash('success')
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
    req.flash('error', '两次密码输入不一致');
    return res.redirect('/signup');
  }

  User.findOne({name: _user.name}, function(err, user) {
    if (err) {
      console.log(err);
    }

    if (user) {
      req.flash('error', '用户名已经存在，请登录');
      return res.redirect('/signin');
    } else {
      user = new User(_user);

      user.save(function(err, user) {
        if (err) {
          console.log(err);
        }
        req.flash('success', '注册成功，请登录');
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
      req.flash('error', '该账号名不存在，请注册');
      res.redirect('/signup');
    } else {
      user.comparePassword(pwd, function(err, isMatch) {
        if (err) {
          console.log(err);
        }

        if (!isMatch) {
          req.flash('error', '账号名与密码不匹配，请重新登录');
          return res.redirect('/signin');
        } else {
          req.session.user = user;
          req.flash('success', '登录成功');
          return res.redirect('/');
        }
      });
    }
  });
};

// logout
exports.logout = function(req, res) {
  delete req.session.user;
  req.flash('success', '注销成功');
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

