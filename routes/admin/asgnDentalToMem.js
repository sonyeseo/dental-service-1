var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Assign dental to member */
router.get('/', function(req, res, next) {

  /*
  console.log('memName: ' + req.query.memName); 
  console.log('memBirth: ' + req.query.memBirth); 
  console.log('address: ' + req.query.memMobile); 
  console.log('memStat: ' + req.query.memStat); 
  console.log('dntl_name: ' + req.query.dntl_name); 
  console.log('dntl_mobile: ' + req.query.dntl_mobile); 
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

  Dental.findOne({dentName:req.query.dntl_name, mobile:req.query.dntl_mobile},function(err,docs){

    if(err) 
      return console.error(err);

    //console.log('dental ObjectID ' + docs );
    //console.log('dental ObjectID ' + docs.id );

    Member.findOneAndUpdate({name:req.query.memName, birth:req.query.memBirth, mobile:req.query.memMobile, stat:req.query.memStat},{stat:1, dntl_key: docs.id},function(err,docs){

    if(err) 
      return console.error(err);

    //console.log('assign dental clinic to member ' + docs );

    res.end('Success');
    
  });

  /*
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

    console.log('inserted ' + docs );

    res.end('Success');
  });
  */

  });

});

module.exports = router;
