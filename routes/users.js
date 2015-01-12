var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* GET users sign up page. */
router.get('/signup', function(req, res) {
  res.render('signup');
});

/* GET users sign in page. */
router.get('/signin', function(req, res) {
  res.render('signin');
});

module.exports = router;
