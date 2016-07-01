var express = require('express');
//set app to express()
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
var path = require('path');//have to have this

var Herocollect = require('../models/herocollect');//here we require the model Herocollect

//connect to the database - userDb is the database name
mongoose.connect('mongodb://localhost:27017/heroesDb');


//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
  console.log('base url');
});//end of base url

app.get( '/getHeroRecords', function( req, res ){
  //go .find the model Herocollect
  Herocollect.find()
  //.then send all the data
  .then( function( data ){
    res.send( data );
  });//end of the .then
});//end of /getHeroRecords function

// hero post
app.post( '/heroPost', function( req, res ){
  console.log( 'in heroPost: ' + req.body );

  // putting req.body.... into an object to be saved in the db
    var heroRecordToAdd= new Herocollect({

      alias: req.body.alias,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.city,
      power_name: req.body.power_name
    });//end heroRecordToAdd

    console.log('heroRecordToAdd' + heroRecordToAdd);
    // MAGIC happening here! newHeroRecord is really the mongoose.model method with parameter of heroRecordToAdd
    heroRecordToAdd.save();
    console.log('new record from app.post: ' + heroRecordToAdd);
  });//end of /heroPost hero info is now abiding in the database unless its not
  //res.send( 'sent from heorPost' );

  //static folder makes 'sourcing' files easy by making them all be on the same level of public
    app.use(express.static('public'));


//spin up server,OMG I have had so much trouble just getting this to work losts of error
app.listen(8080, 'localhost', function(req, res){
  console.log('listen 8080');
});//end of the server
