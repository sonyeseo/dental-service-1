var express = require('express');
var router = express.Router();

function requireLogin (req, res, next) {
	console.log(req.admin);
	
	if (!req.admin) {
	//if (!req.session.admin) {
		req.session.destroy();
		res.redirect('/adminLogin');
	} else {
		next();
	}
};


/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  res.render('adminMain', { title: 'Admin Main Pages' });
});

module.exports = router;
