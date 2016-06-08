var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dental/dentalLogin', { title: 'Dental Log in' });
});

module.exports = router;
