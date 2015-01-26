var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/index');

/* GET home page. */
router.get('/', Index.showHome);

/* User Sign in*/
router.get('/signin', Index.showSignin);

/* User Sign up*/
router.get('/signup', Index.showSignup);

module.exports = router;
