
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

/****************************************************************************************************/

var adminReg = require('./routes/admin/adminReg');
var adminInfoUpdt = require('./routes/admin/adminInfoUpdt');
var adminInfoSave = require('./routes/admin/adminInfoSave');
var adminLogin = require('./routes/admin/adminLogin');
var chkAdminLogin = require('./routes/admin/chkAdminLogin');
var adminMain = require('./routes/admin/adminMain');
var adminLogout = require('./routes/admin/adminLogout');
var adminRouter = require('./routes/admin/adminRouter');

var regDentalInfo = require('./routes/admin/regDentalInfo');
var srchDentalInfo = require('./routes/admin/srchDentalInfo');
var srchDentalByArg = require('./routes/admin/srchDentalByArg');

var regMemInfo = require('./routes/admin/regMemInfo');
var srchMemInfoNasgned = require('./routes/admin/srchMemInfoNasgned');
var asgnDentalToMem = require('./routes/admin/asgnDentalToMem');
var srchMemInfoAsgned = require('./routes/admin/srchMemInfoAsgned');
var adminSrchMemInfoCmplted = require('./routes/admin/adminSrchMemInfoCmplted');
var adminGetMemInfoCmplted = require('./routes/admin/adminGetMemInfoCmplted');


var dentalLogin = require('./routes/dental/dentalLogin');
var chkDentalLogin = require('./routes/dental/chkDentalLogin');
var dentalLogout = require('./routes/dental/dentalLogout');
var dentalRouter = require('./routes/dental/dentalRouter');

var dentalSrchMemInfo = require('./routes/dental/dentalSrchMemInfo');
var imgSave = require('./routes/dental/imgSave');
var dentalSrchMemInfoCmplted = require('./routes/dental/dentalSrchMemInfoCmplted');
var dentalGetMemInfoCmplted = require('./routes/dental/dentalGetMemInfoCmplted');


var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-auto-increment');

//mongoose.connect('mongodb://localhost/dentalDB');

mongoose.connect(process.env.MONGODB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var db = mongoose.connection;
autoIncrement.initialize(db);

var adminSchema = mongoose.Schema({

  adminName: {type: String, required: true, trim: true },
  adminId: {type: String, required: true, trim: true },
  adminPwd: {type: String, required: true, trim: true }

},{versionKey: false}
);

var dentSchema = mongoose.Schema({

  dentId: {type: String, required: true, trim: true },
  dentPwd: {type: String, required: true, trim: true },
  dentName: {type: String, required: true, trim: true },
  doctName: {type: String, required: true, trim: true },
  address: {type: String, required: true, trim: true }, 
  mobile: {type: String, required: true, trim: true }, 
  tel: {type: String, required: true, trim: true },

},{versionKey: false}
);

var memSchema = mongoose.Schema({

  name: {type: String, required: true, trim: true },
  birth: {type: String, required: true, trim: true }, 
  address: {type: String, required: true, trim: true }, 
  mobile: {type: String, required: true, trim: true },
  stat: { type: Number, required: true, default: 0 },

  dntl_key: { type: mongoose.Schema.Types.ObjectId, ref: 'dental' },
  img_key: {type: mongoose.Schema.Types.ObjectId, ref: 'Grid' }

},{versionKey: false});

var gridSchema = mongoose.Schema({},{versionKey: false},{strict: false});

adminSchema.plugin(timestamps);
dentSchema.plugin(timestamps);
memSchema.plugin(timestamps);

adminSchema.plugin(autoIncrement.plugin, { model: 'manager', field: 'adminIdx', startAt: 1, incrementBy: 1 });
var manager = mongoose.model('manager', adminSchema);

dentSchema.plugin(autoIncrement.plugin, { model: 'dental', field: 'dentIdx', startAt: 0, incrementBy: 1 });
var dental = mongoose.model('dental', dentSchema);

memSchema.plugin(autoIncrement.plugin, { model: 'member', field: 'memIdx', startAt: 1, incrementBy: 1 });
var member = mongoose.model('member', memSchema);

//var gridSchema = new Schema({}, { strict: false });
//var GFS = mongoose.model("GFS", new Schema({}, {strict: false}), "fs.files" );
var Grid = mongoose.model("Grid", gridSchema, "fs.files" );

/****************************************************************************************************/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/****************************************************************************************************/

app.use(session({
  secret: '2C44-4D44-WppQ38S', 
  duration: 10*60*1000, 
  activeDuration: 5*60*1000, 
  resave: false, 
  saveUninitialized: true
}));

app.use(function noCache(req, res, next){
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires",0);
  next();
});

//app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(function(req,res,next){
  //console.log("------ Start Check Session -----");
  //console.log(req.session);
  //console.log(req.session.admin);
  //console.log(req.session.dental);
  
  //if (req.session && req.session.user === "amy" && req.session.admin)
  //if (req.session && req.session.user === "amy" && req.session.admin)
  if (req.session && req.session.admin)
  //if (req.session.admin)
  {
    //console.log("------ Admin Check Session -----");
    
    manager.findOne({adminId: req.session.admin.adminId}, function(err, admin){

      if(admin)
      {
        //console.log(admin);
        req.admin = admin;
        delete req.admin.adminPwd;
        req.session.admin = admin;
        //res.locals.admin = admin;
      }
      next();
    });
    //next();
  }
  else if(req.session && req.session.dental)
  {
    //console.log("------ Dental Check Session -----");
    //return res.sendStatus(401);
    //return res.redirect('/pages/mulview.html');
    //return res.render('login');
    //return res.render('adminLogin');
  
    //console.log("------ Dental Check Session exist -----"+req.session.dental.dentId);

    dental.findOne({dentId: req.session.dental.dentId}, function(err, dent){

      if(dent)
      {
        //console.log(dent);
        req.dental = dent;
        delete req.dental.dentPwd;
        req.session.dental = dent;
        //res.locals.dent = dent;
      }
      next();
    });
    //next();
  }
  else
  {
    //console.log("------ Not Session Go to next -----");
    next();
  }
});


// Make our db accessible to our router
app.use(function(req,res,next){
  //console.log("------ Requset -----");

  req.db = db;
  req.manager = manager;
  req.dental = dental;
  req.member = member;

  next();
});

/****************************************************************************************************/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/****************************************************************************************************/


app.use('/adminReg', adminReg);
app.use('/adminInfoUpdt', adminInfoUpdt);
app.use('/adminInfoSave', adminInfoSave);
app.use('/adminLogin', adminLogin);
app.use('/chkAdminLogin', chkAdminLogin);
app.use('/adminMain', adminMain);
app.use('/adminLogout', adminLogout);
app.use('/adminRouter', adminRouter);

app.use('/regDentalInfo', regDentalInfo);
app.use('/srchDentalInfo', srchDentalInfo);
app.use('/srchDentalByArg', srchDentalByArg);

app.use('/regMemInfo', regMemInfo);
app.use('/srchMemInfoNasgned', srchMemInfoNasgned);
app.use('/asgnDentalToMem', asgnDentalToMem);
app.use('/srchMemInfoAsgned', srchMemInfoAsgned);
app.use('/adminSrchMemInfoCmplted', adminSrchMemInfoCmplted);
app.use('/adminGetMemInfoCmplted', adminGetMemInfoCmplted);

app.use('/dentalLogin', dentalLogin);
app.use('/chkDentalLogin', chkDentalLogin);
app.use('/dentalLogout', dentalLogout);
app.use('/dentalRouter', dentalRouter);

app.use('/dentalSrchMemInfo', dentalSrchMemInfo);
app.use('/imgSave', imgSave);
app.use('/dentalSrchMemInfoCmplted', dentalSrchMemInfoCmplted);
app.use('/dentalGetMemInfoCmplted', dentalGetMemInfoCmplted);

/****************************************************************************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
