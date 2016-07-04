var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');//have to have this

var router = express.Router();

app.use(bodyParser.json());

//var mongoose = require('mongoose'); now over in


var Herocollect = require('../models/herocollect');//here we require the model Herocollect
//require heroRoute
var heroRoute = require('../routes/heroRoute');//require routes heroRoute
//use heroRoute.js
app.use('/', heroRoute);//loading the router module

//base url
// app.get('/', function(req, res) {
//   res.sendFile(path.resolve('views/index.html'));
//   console.log('base url');
// });//end of base url


// // hero post
// app.post( '/heroPost', function( req, res ){
//   console.log( 'in heroPost: ' + req.body );
//
//   // putting req.body.... into an object to be saved in the db
//     var heroRecordToAdd= new Herocollect({
//
//       alias: req.body.alias,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       city: req.body.city,
//       power_name: req.body.power_name
//     });//end heroRecordToAdd
//
//     console.log('heroRecordToAdd   ' + heroRecordToAdd);
//     // MAGIC happening here! newHeroRecord is really the mongoose.model method with parameter of heroRecordToAdd
//     heroRecordToAdd.save();
//     console.log('new record heroRecordToAdd: ' + heroRecordToAdd);
//   });//end of /heroPost hero info is now abiding in the database unless its not
  //res.send( 'sent from heorPost' );

  // app.post( '/removeHero', function (req, res) {
  //   console.log('in /removeHero    ' + req.body.id);
  //       var heroId = new Herocollect({
  //         _id: req.body.id
  //
  //       });//end of var heroId
  //
  //       console.log('after closure var heroId  = ' + heroId);
  //       Herocollect.findByIdAndRemove({_id: req.body.id})
  //       //.then send all the data
  //       .then( function( heroId ){
  //         Herocollect.delete(heroId);
  //         console.log('heroId   ' + heroId);
  //       });//end of the .then
  //     });//end of removeHero

  //static folder makes 'sourcing' files easy by making them all be on the same level of public
    app.use(express.static('public'));


//spin up server,OMG I have had so much trouble just getting this to work losts of error
app.listen(8080, 'localhost', function(req, res){
  console.log('listen 8080');
});//end of the server
