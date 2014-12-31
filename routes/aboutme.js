var express = require('express');
var router = express.Router();

/* GET about me page. */
router.get('/', function(req, res) {
  res.end('This is About Me Page.');
});

module.exports = router;
