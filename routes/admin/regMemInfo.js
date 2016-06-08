var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Register member info. */
router.get('/', function(req, res, next) {

	/*
	console.log('name: ' +req.query.name); 
	console.log('membirth: ' +req.query.birth); 
	console.log('address: ' +req.query.address); 
	console.log('mobile: ' +req.query.mobile); 
	console.log('stat: ' +req.query.stat); 
	console.log('dntl_key: ' +req.query.dntl_key); 
	*/
	var db = req.db;
	var Dental = req.dental;
	var Member = req.member;

	/*
	var member = new Member();
	member.name = req.query.name;
	member.birth = req.query.birth;
	member.address = req.query.address;
	member.mobile = req.query.mobile;
	member.stat = req.query.stat;
	member.dntl_key = req.query.dntl_key;
	*/

	Dental.findOne({dentIdx:0},function(err,docs){

		if(err) 
			return console.error(err);

		var member = new Member();

		member.name = req.query.name;
		member.birth = req.query.birth;
		member.address = req.query.address;
		member.mobile = req.query.mobile;
		member.stat = req.query.stat;
		member.dntl_key = docs.id;

		member.save(function(err,docs){
			if(err) 
				return console.error(err);

			if (docs == null)
				console.log("not data")

			//console.log('inserted ' + docs );

			res.end('Success');
		});

	});

});

module.exports = router;
