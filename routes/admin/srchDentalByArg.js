var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* GET Userlist page. */
router.get('/', function(req, res, next) {

  var db = req.db;
  var Dental = req.dental;
  var qname = req.query.name;

  //console.log("I have received the value:" + qname + ":");
  
  //memcode.find({_id:0,name:1,code:1},function(err, docs){
  //memcode.find({'name':'세종'},{_id:0,name:1,code:1},function(err, docs){
  //memcode.find({name:new RegExp('^'+qname+'$', "i")},{_id:0,name:1,code:1},function(err, docs){
  //var regex = new RegExp('^'+qname, "i"), query = { name: regex };
  //var regex = new RegExp('.*'+qname+'.*'), query = {dentName: regex};
  var query = {dentName: new RegExp( ".*" + req.query.name + ".*" )};
  Dental.find(query,{_id:0,dentName:1,mobile:1},function(err, docs){

    if(err) 
      return console.error(err);

    //console.log("Dental.find()");
    res.send(docs);
  }); 

});

module.exports = router;

