var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user.js');

/* GET users listing. */
router.get('/', User.showList);

/* GET users sign up page. */
router.get('/signup', User.showSignup);

/* GET users sign in page. */
router.get('/signin', User.showSignin);

/* POST user sign up */
router.post('/signup', User.signup);

module.exports = router;
