var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Update Managers */
router.get('/', function(req, res, next) {

    var db = req.db;
    var Manger = req.manager;

	Manger.findByIdAndUpdate(("573308683ae25c705be8d189"), {adminName:'xxxxx'},function(err,docs){

		if(err) 
			return console.error(err);

		console.log('update ' + docs );
	    res.end('update success');
	});

});

module.exports = router;
