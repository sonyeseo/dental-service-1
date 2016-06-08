var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Search assigned member info. */
router.get('/', function(req, res, next) {

  var db = req.db;
  var Member = req.member;

  //console.log('dentname: ' +req.query.dentname); 
  //console.log('mobile: ' +req.query.mobile); 

  Member.find({stat: 0},{_id:0,createdAt:0,updatedAt:0,stat:0},function(err, docs){

    if(err) 
      return console.error(err);

    if (docs == null)
      console.log("not data")

    console.log('Member.find ' + docs );

    res.send(docs);
  });

});

module.exports = router;
