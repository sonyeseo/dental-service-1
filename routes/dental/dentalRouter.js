var express = require('express');
var router = express.Router();

function requireLogin (req, res, next) {
	//console.log(req.dental);
	
	if (!req.dental) {
		//if (!req.session.admin) {
		req.session.destroy();
		res.redirect('/dentalLogin');
	} else {
		next();
	}
};


/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  res.render('dental/dentalRouter', { title: 'Dental Router Express' });
});

module.exports = router;
