console.log('script.js sourced is not sourced');

var myApp = angular.module( 'myApp', [] );

//controller set up for "$scope" of what will be controlled by angular in index.html
myApp.controller( 'heroController', [ '$scope', '$http', function( $scope, $http ){
  //define the array allTheHeroes
$scope.allTheHeroes = [];
  //'Add' button clicked now input expressions of the ng-model tags are passed into heroObjectToSend
  $scope.addHeroRecord = function(){
    console.log('addHeroRecord clicked');

    event.preventDefault();
    //define object petObjectToSend and takes values from the input expressions
    var heroObjectToSend ={
      alias: $scope.alias,//here must match the ng-model="alias" and so on
      first_name: $scope.first_name,
      last_name: $scope.last_name,
      city: $scope.city,
      power_name: $scope.power_name

    };//end of object heroObjectToSend, continute to POST below
    console.log('heroObjectToSend' + heroObjectToSend.alias);
    //call to send or POST the info of objectToSend via the url route of /petPost
    $http({
      method: 'POST',
      url: '/heroPost',
      data: heroObjectToSend
    });//end of $http call

        $scope.alias='';//clears the input
        $scope.first_name='';//clears the input
        $scope.last_name='';//clears the input
        $scope.city='';//clears the input
        $scope.power_name='';//clears the input
  };//end of addheroRecord function go serverside to app.js and post /heroPost path

  //'show pets' button clicked now GET method via url path of /getPetRecords initiated
    $scope.getHeroRecords = function(){
      $http({
        method: 'GET',
        url: '/getHeroRecords',
      }).then( function( response ){
        //here the ask for info from database happens and the array allTheHeroes is equated to response.data on serverside
        $scope.allTheHeroes = response.data;
        console.log( $scope.allTheHeroes );
      },//end .then
      function myError( response ){
        console.log( response.statusText );
      }//end the myError
    );//close the .then
  };//end of getHeroRecords function

  //removePet button clicked and removePet function initiated with index as parameter or arguent
  $scope.removeHero = function(index){
    var heroToRemove = $scope.allTheHeroes[index];
    //here it is saying in NG to take the array allThePets and loop through it looking for index and removing it from the dom
    $scope.allTheHeroes.splice(index, 1);
    console.log('heroToRemove._id' + heroToRemove._id);
    var heroId = {id: heroToRemove._id};
    $http({
      method: 'DELETE',
      url: '/removeHero',
      data: heroId
    });//end of $http
  };//end of removeHero


}]);//end of heorController controller
