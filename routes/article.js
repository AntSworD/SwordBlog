var express = require('express');
var router = express.Router();

/* GET article page. */
router.get('/', function(req, res) {
  res.render('article', {
    title: 'SwordBlog',
  });
});

/* GET article page with id. */
router.get('/:id', function(req, res) {
  var id = req.params.id;
  res.end('This is Article Page, the article\'s id is ' + id);
});

module.exports = router;
