var express = require('express');
var router = express.Router();

/* GET article page. */
router.get('/', function(req, res) {
  var article = {
    title: '第一篇文章',
    authorId: 'AntSworD', // TODO:这里改成authorName
    meta: Date.now(),
    pv: 12345,
    content: '文章内容'
  };
  res.render('article', {
    title: 'SwordBlog',
    article: article
  });
});

/* GET article page with id. */
router.get('/:id', function(req, res) {
  var id = req.params.id;
  res.end('This is Article Page, the article\'s id is ' + id);
});

module.exports = router;
