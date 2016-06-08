var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var db = req.db;
  var Member = req.member;

  /*
  var dental = new Dental();
  dental.dentName = req.query.dentname;
  dental.doctName = req.query.doctname;
  dental.address = req.query.address;
  dental.mobile = req.query.mobile;
  dental.tel = req.query.tel;
  */

  //Member.find({stat: 1},{_id:0,createdAt:0,updatedAt:0,stat:0}).populate('dntl_key').run(function(err, docs){
  //Member.find({stat:1}).populate('dntl_key').exec(function(err, docs){
  //Member.find({stat: 0},{_id:0,createdAt:0,updatedAt:0,stat:0},function(err, docs){
  //Member.find({stat:2},{_id:0,createdAt:0,updatedAt:0,stat:0}, function(err, docs){
  Member.find({stat:2},{_id:0,createdAt:0,updatedAt:0,stat:0}).populate('dntl_key').exec(function(err, docs){
    if(err) 
      return console.error(err);

    if (docs == null)
      console.log("not data")

    //console.log('Member.find ' + docs );

    res.send(docs);
  });

});

module.exports = router;
