var express = require('express');
var router = express.Router();

/* Register Administrator password */
router.get('/', function(req, res, next) {
  res.render('admin/adminReg', { title: 'Admin Registration' });
});

module.exports = router;
