var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
//var Busboy = require('busboy');

//var streamifier = require('streamifier');
var Grid = require('gridfs-stream');
//Grid.mongo = mongoose.mongo;

//var multer  = require('multer');
//var upload = multer({ dest: './fileUpload/'});
//var type = upload.single('file');


/* GET home page. */
router.post('/', function(req, res, next) {
//router.post('/', type, function(req, res, next) {

  var db = req.db;
  var Member = req.member;

  var fileId = new mongoose.Types.ObjectId();
  var form = new multiparty.Form();

  var filename;
  var size;
  var mem_obj_id;


  // get field name & value
  //form.on('field',function( val1, val2, mem_obj_id ){
    //console.log('normal field , val1 = '+ val1 +' , val2 = ' + val2 +', mem_obj_id = ' + mem_obj_id);
  //});
  //form.on('field',function(val1 ){
    //console.log('normal  mem_obj_id = ' + val1);
  //});
  form.on('field',function( val1, val2 ){
    console.log('normal field , val1 = '+ val1 +' , val2 = ' + val2 );
    mem_obj_id = val2 ;
  });

  // file upload handling
  form.on('part',function(part){
    //var filename;
    //var size;

    if (part.filename) {
      filename = part.filename;
      size = part.byteCount;
    }else{
      part.resume();
    }        

    console.log("part -- Write Streaming file :"+filename);
    var writeStream = fs.createWriteStream('/tmp/'+filename);
    //writeStream.filename = filename;
    part.pipe(writeStream);

    part.on('data',function(chunk){
      console.log(filename+' read '+chunk.length + 'bytes');
    });

    part.on('end',function(){
      console.log(filename+' Part read complete');
      writeStream.end();
    });
  });

  // all uploads are completed
  form.on('close',function(){
    console.log('form close -- Upload complete');
    console.log("form close -- Write gridfs-Streaming file :"+filename);

    var gfs = new Grid(mongoose.connection.db, mongoose.mongo);
    var readfile = fs.createReadStream('/tmp/'+filename); //(req.file.path);
    //var f = readfile.pipe(gfs.createWriteStream({
      //  filename:  req.file.originalname
    //}));
    var f = readfile.pipe(gfs.createWriteStream({
      _id: fileId,
      filename: filename,// req.file.originalname,
      mode: 'w',
      content_type: 'image/jpeg'//req.file.mimetype
    }));

    f.on('close', function(){
      console.log('file close -- File Added to GRIDFS');
      //res.end('file upload');
      console.log( 'file close -- upload image data fileId:' + fileId );
      //res.writeHead(200, {'content-type': 'text/html'});
      //res.end('<a href="/file/' + fileId.toString() + '">download file</a>');

      fs.unlink('/tmp/'+filename/*req.file.path*/, function (err) {
        if (err) throw err;
        //res.send('File uploaded to: ' + req.file.path + ' - ' + req.file.size + ' bytes');
      });

      Member.findOneAndUpdate({_id: mem_obj_id},{stat:2, img_key: fileId}, function(err,docs){

        if(err) return console.error(err);

        console.log('assign dental clinic to member ' + docs );
        res.end('Success');
      
      });

    });

    f.on('error', function() {
		  console.log('error -- upload image data body headers' );
      res.status(500).send("Could not upload file");
    });

    res.status(200).send('Upload complete');
  });

  // track progress
  form.on('progress',function(byteRead,byteExpected){
    console.log(' Reading total  '+byteRead+'/'+byteExpected);
  });

  form.parse(req);

  console.log('ends -- upload image data body headers' );

});

module.exports = router;
