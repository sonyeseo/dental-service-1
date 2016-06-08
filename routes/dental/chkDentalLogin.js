var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();


/* Check Manager's password */
router.get('/', function(req, res, next) {

    var db = req.db;
    var Dental = req.dental;

	var ChkLogin = function(){
	    events.EventEmitter.call(this); // call super class constructor
	};

	util.inherits(ChkLogin,events.EventEmitter);

	ChkLogin.prototype.fail = function(data)
	{
		this.emit('respFail', data);
	};

	ChkLogin.prototype.sucs = function(data)
	{
		this.emit('respSucss', data);
	};

	var respSuccess = function(data){
		res.end(data);
    }

	var respFail = function(data){
		res.end(data);
    }

  	var chkLogin = new ChkLogin();

	chkLogin.on('respFail', respFail);
	chkLogin.on('respSucss', respSuccess);

	//console.log('****** chkDentalLogin');
	Dental.findOne({dentId: req.query.id}, function(err, dental){
		if(!dental)
		{
			chkLogin.fail('Fail');
		}
		else
		{
			//console.log('####### chkDentalLogin');
			if(req.query.pwd == dental.dentPwd)
			{
				//console.log(dental);
				req.session.dental = dental;
				//delete req.dental.adminPwd;
				//req.session.dental = dental;
				//res.locals.dental = dental;

				chkLogin.sucs('Success');
			}
			else
			{
				chkLogin.fail('Fail');
			}
		}
	});

    //console.log('id: ' + JSON.stringify(req.query.id));    
    //console.log('id: ' +req.query.id);    
    //console.log('password: ' + JSON.stringify(req.query.pwd));    
    //console.log('password: ' +req.query.pwd);    
    //console.log('email: ' + JSON.stringify(sess));    

});

module.exports = router;
