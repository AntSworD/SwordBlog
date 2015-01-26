// Show home page
exports.showHome = function(req, res) {
  var articles = [];
  for (var i = 0; i < 10; ++ i) {
    var article = {
      meta: {
        publishAt: new Date(Date.now() - 86400000 * i)
      },
      title: 'Article Title ' + (i + 1)
    };
    articles.push(article);
  }
  res.render('index', {
    title: 'SwordBlog',
    articles: articles,
    error: req.flash('error'),
    success: req.flash('success')
  });
};

// User sign in
exports.showSignin = function(req, res) {
  res.redirect('/users/signin');
};

// User sign up
exports.showSignup = function(req, res) {
  res.redirect('/users/signup');
};
