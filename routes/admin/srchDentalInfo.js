var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Search dental info */
router.get('/', function(req, res, next) {

  var db = req.db;
  var Dental = req.dental;
  /*
  var dental = new Dental();
  dental.dentName = req.query.dentname;
  dental.doctName = req.query.doctname;
  dental.address = req.query.address;
  dental.mobile = req.query.mobile;
  dental.tel = req.query.tel;
  */
  //var qname = JSON.stringify(req.query.dentName);
  //var qmob = JSON.stringify(req.query.mobile);
  //var dentName = req.query.dentName;
  //var mobile = req.query.mobile;

  console.log('dentname: ' +req.query.dentname); 
  console.log('mobile: ' +req.query.mobile); 

  //query.where('username').regex(new RegExp("\/"+req.query.username+"\/"));
  //var regex = new RegExp('.*'+qname+'.*'), query = {dentName: regex};
  //var query = {dentName: qname, mobile: qmob};
  //var query = {dentName: '서울치과', mobile: '01012341234'};
  //var query = {};
  //query[dentName] = dentName;
  //query[mobile] = mobile;
  //Dental.find().where('dentName', dentName).where('mobile', mobile).exec(function(err, docs) {
  //Dental.find().where('dentName', req.query.dentName).exec(function(err, docs) {
  //Dental.find(query,{_id:0,dentName:1,mobile:1},function(err, docs){
  //Dental.find({dentName: '서울치과', mobile: '01012341234'},{_id:0,dentName:1,mobile:1},function(err, docs){
  //Dental.find(function(err,docs){
  //Dental.find({dentName: req.query.dentname, mobile: req.query.mobile},{_id:0,dentName:1,mobile:1},function(err, docs){
  Dental.find({dentName: req.query.dentname, mobile: req.query.mobile},{_id:0,createdAt:0,updatedAt:0},function(err, docs){

    if(err) 
      return console.error(err);

    if (docs == null)
      console.log("not data")

    console.log('Dental.find ' + docs );

    res.send(docs);
  });

});

module.exports = router;
