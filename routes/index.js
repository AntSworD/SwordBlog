var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
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
    articles: articles
  });
});

module.exports = router;
