var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Save administrator info. */
router.get('/', function(req, res, next) {

	var db = req.db;
	var Manger = req.manager;

	var admin = new Manger();

	admin.adminName = req.query.name;
	admin.adminId = req.query.id;
	admin.adminPwd = req.query.pwd;

	admin.save(function(err,docs){
		if(err) 
			return console.error(err);

		if (docs == null)
			console.log("not data")

		//console.log('inserted ' + docs );

		res.end('insert success');
	});

});

module.exports = router;
