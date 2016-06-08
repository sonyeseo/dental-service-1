var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

var Grid = require('gridfs-stream');

/* GET home page. */
router.get('/', function(req, res, next) {

  var db = req.db;
  var Member = req.member;
  var gfs = new Grid(mongoose.connection.db, mongoose.mongo);

  //console.log('dental ID: ' + req.session.dental._id); 
  //console.log('name: ' + req.query.name); 
  //console.log('mobile: ' + req.query.mobile); 
  
  Member.find({stat:2, name: req.query.name , mobile: req.query.mobile},{createdAt:0,updatedAt:0}).populate('img_key').exec(function(err, docs){
    //Member.find({stat: 0},{_id:0,createdAt:0,updatedAt:0,stat:0},function(err, docs){
    if(err) 
      return console.error(err);

    if (docs == null)
      console.log("not data")

    console.log('Image.find ' + docs );
    console.log('Image.ID ' + docs[0].stat );

    var readstream = gfs.createReadStream({
            //_id: "5744034fae8febe01573d3ad",
            _id: docs[0].img_key._id,
            mode:'r',
            content_type: 'image/jpeg'//req.file.mimetype
     });

      readstream.on('error', function (err) {
          console.log( 'upload image data error' + err );
          res.status(500).send("Could not upload file");
          //res.send(500, err);
      });
      
      readstream.on('open', function () {
          console.log( 'upload image data open' );
          //readstream.pipe(res);
      });

       readstream.on('data', function (data) {
          // We got a buffer of data...
          console.log("Got data while processing stream " );
          var buf2 = new Buffer(data).toString('base64'); 
          res.send(buf2.toString())
          //console.log(buf2.toString());
          //console.log(data);
      });

       readstream.on('end', function () {
        // File finished reading...
         console.log("Got end while processing stream " );
      });


/*
      var bufs = [];

      readstream.on('data', function(chunk) {

          bufs.push(chunk);
          console.log(' read '+chunk.length + 'bytes');

      }).on('end', function() { // done

          var fbuf = Buffer.concat(bufs);

          var base64 = (fbuf.toString('base64'));

          res.send(base64);
          //res.send('<img ng-src="data:image/jpeg;base64,' + base64 + '">');
          console.log("Got end while processing stream " );

      }).on('open', function() { // done
          console.log( 'open upload image data open' );
      }).on('data', function() { // done
          console.log("data Got data while processing stream " );
      }).on('error', function(err) { // done
           console.log( 'error image data error' + err );
      });
*/
  });

});

module.exports = router;
