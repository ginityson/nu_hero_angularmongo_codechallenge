console.log('script.js sourced');

var myApp = angular.module( 'myApp', ['ui.bootstrap'] );//have to have 'ui.bootstrap' for TabController
console.log('script.js sourced after myApp' );
//controller set up for "$scope" of what will be controlled by angular in index.html
myApp.controller( 'heroController', [ '$scope', '$http', function( $scope, $http ){
  //define the array allTheHeroes
$scope.allTheHeroes = [];

//GET 'show hero' button clicked GET method via url path of /getheroRecords initiated to display on DOM
  $scope.getHeroRecords = function(){
    $http({
      method: 'GET',
      url: '/getHeroRecords',
    }).then( function( response ){
      //here the ask for info from database happens and the array allTheHeroes is equated to response.data on serverside
      $scope.allTheHeroes = response.data;
      console.log( 'getHeroRecords() allTheHeroes' + $scope.allTheHeroes );
    });//end .then
  };//end of getHeroRecords function
  $scope.getHeroRecords();//have to call the function getHeroRecords

  //'Add' button clicked now input expressions of the ng-model tags are passed into heroObjectToSend
  $scope.addHeroRecord = function(){
    console.log('addHeroRecord clicked');

    event.preventDefault();
    //define object heroObjectToSend and takes values from the input expressions
    var heroObjectToSend ={
      alias: $scope.aliasIn,//here must match the ng-model="alias" and so on
      first_name: $scope.first_nameIn,
      last_name: $scope.last_nameIn,
      city: $scope.cityIn,
      power_name: $scope.power_nameIn
    };//end of object heroObjectToSend, continute to POST below
    console.log('heroObjectToSend' + heroObjectToSend);
    //call to send or POST the info of objectToSend via the url route of /petPost
    $http({
      method: 'POST',
      url: '/heroPost',
      data: heroObjectToSend
    }).then( function(){
      $scope.getHeroRecords();
  });//end .then
        $scope.aliasIn='';//clears the input
        $scope.first_nameIn='';//clears the input
        $scope.last_nameIn='';//clears the input
        $scope.cityIn='';//clears the input
        $scope.power_nameIn='';//clears the input
  };//end addheroRecord function go serverside to app.js and post /heroPost path

  //removeHero button clicked and removeHero function initiated w/anythingId as param from index
  $scope.removeHero = function(anythingId){
    console.log('in removeHero function');
    var heroId = {id: anythingId};
    console.log('heroId' + heroId);
    $http({
      method: 'DELETE',
      url: '/removeHero',
      data: heroId,
      headers: {'Content-Type': 'application/json;charset=utf-8'}//what is this?
    }).then(function(){
      $scope.getHeroRecords();
    });//end .then
  };//end removeHero function

}]);//end of heroController controller

//for partials need TabController outside of heroController
myApp.controller('TabController', function ($scope, $window) {
  $scope.tabs = [
    { title: 'Home', content: 'partials/heroHome.html'},
    { title:'Add Hero', content: 'partials/addHero.html'},
    { title:'See Heroes', content: 'partials/seeHeroes.html'}
  ];//end of tab arrary
});//end of TabController
