var express = require('express');//remember to npm install
var router = express.Router();
var path = require('path');//remember to npm install
//here requireing in path to directory models where file herocollect.js contains the DB schema
var herocollect = require( '../models/herocollect');
var mongoose = require('mongoose');//remember to npm install

//setting up connections to mongo db where heroesDb is name of db
mongoose.connect( 'mongodb://localhost:27017/heroesDb' );

    // base url define the Hero home page route
    router.get('/', function(req, res) {
      console.log('Hero home page router base url');
        res.sendFile( path.resolve( 'views/index.html') );
        console.log('after sendFile base url');
    });//end of base url

    router.delete('/removeHero', function(req, res){
      console.log('in /removeHero    ' + req.body.id);
        herocollect.findByIdAndRemove(req.body.id, function(err){
          if(err){
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }//end of (err)(200)
        });//end of findByIdAndRemove
    });//end of removeHero

    router.get( '/getHeroRecords', function( req, res ){
        //go .find the model Herocollect
        herocollect.find()
          //.then send all the data
          .then( function( data ){
            res.send( data );
          });//end of the .then
    });//end of /getHeroRecords function

    // hero post
    router.post( '/heroPost', function( req, res ){
      console.log( 'in heroPost: ' + req.body );

      // putting req.body.... into an object to be saved in the db
        var heroRecordToAdd= new herocollect({//refers back to schema structure
          alias: req.body.alias,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          city: req.body.city,
          power_name: req.body.power_name
        });//end heroRecordToAdd
        console.log('heroRecordToAdd   ' + heroRecordToAdd);
        // MAGIC happening here! newHeroRecord is really the mongoose.model method with parameter of heroRecordToAdd
        heroRecordToAdd.save(function(err) {//need to define param of err here put in {}
              if (err) {
                console.log(err);
                res.sendStatus(500);
              } else {
                res.sendStatus(200);
                }//end else
            });//end heroRecordToAdd.save(function(err)
        });//end /heroPost

    router.post( '/removeHero', function (req, res) {
      console.log('in /removeHero    ' + req.body.id);
          var heroId = new herocollect({
            _id: req.body.id
          });//end of var heroId

          console.log('after closure var heroId  = ' + heroId);
          heroCollect.findByIdAndRemove({_id: req.body.id})
            //.then send all the data
            .then( function( heroId ){
              heroCollect.delete(heroId);
              console.log('heroId   ' + heroId);
            });//end of the .then
      });//end of /removeHero

module.exports = router;
