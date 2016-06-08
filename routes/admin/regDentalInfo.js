var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Save dental info. */
router.get('/', function(req, res, next) {
	/*
    console.log('dentname: ' +req.query.dentname); 
    console.log('doctname: ' +req.query.doctname); 
    console.log('address: ' +req.query.address); 
    console.log('mobile: ' +req.query.mobile); 
    console.log('tel: ' +req.query.tel); 
    */
    var db = req.db;
    var Dental = req.dental;

	var dental = new Dental();

	dental.dentId = req.query.dentid;
	dental.dentPwd = req.query.dentpwd;
	dental.dentName = req.query.dentname;
	dental.doctName = req.query.doctname;
	dental.address = req.query.address;
	dental.mobile = req.query.mobile;
	dental.tel = req.query.tel;

	dental.save(function(err,docs){
		if(err) 
			return console.error(err);

		if (docs == null)
			console.log("not data")

		//console.log('inserted ' + docs );

    	res.end('Success');
	});

    //res.end('Success');

});

module.exports = router;
