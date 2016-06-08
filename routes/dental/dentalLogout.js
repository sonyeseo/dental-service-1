var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/dentalLogin');
      }
  });
  
  //req.session.destroy();
  //res.redirect('/dentalLogin');
});

module.exports = router;
