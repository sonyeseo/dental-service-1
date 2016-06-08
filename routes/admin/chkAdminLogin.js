var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();


/* Check Manager's password */
router.get('/', function(req, res, next) {

    var db = req.db;
    var Manger = req.manager;

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

	//console.log('****** chkAdminLogin');
	Manger.findOne({adminId: req.query.id}, function(err, admin){
		if(!admin)
		{
			chkLogin.fail('Fail');
		}
		else
		{
			//console.log('####### chkAdminLogin');
			if(req.query.pwd == admin.adminPwd)
			{
				//console.log(admin);
				req.session.admin = admin;
				//delete req.admin.adminPwd;
				//req.session.admin = admin;
				//res.locals.admin = admin;

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
