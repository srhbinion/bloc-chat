var binChat = angular.module("binChat", ["ui.router","firebase"]);

/**
 * Configuration for the angular site views and linking the controllers
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider)  - removes errors and hashbangs from address
 */
binChat.config(function($locationProvider, $stateProvider) {
	//configure an application's path
	$locationProvider.html5Mode({
        //Disables hashbangs in URL
        enabled: true,
        //avoids common $location errors
        requireBase: false
    });
	//State Provider - sets up an address for each template state
	$stateProvider
		.state("landing",{
			// properties of the state listed in "controller"
			url: "/index.html",
			controller:"LandingController",
			templateUrl:"/templates/landing.html"
		})
        .state("submit",{
			// properties of the state listed in "controller"
			url: "/submit.html",
			controller:"SubmitController",
			templateUrl:"/templates/submit.html"
		});
});

/**
 * Controls the landing view
 * @return {}  - 
 * @return {}  - 
 */
binChat.controller("LandingController", ["$scope", "$firebaseArray","Room", function($scope, $firebaseArray, Room) {
    $scope.welcome = "Welcome, to Bloc Chat";
    $scope.chatRooms = Room.all;
}]);

binChat.controller("SubmitController", ["$scope", function ($scope) {
    
}]);

binChat.factory("Room", ['$firebaseArray', function($firebaseArray) {
    var firebaseRef = new Firebase("https://binchat.firebaseio.com/");
    var rooms = $firebaseArray(firebaseRef.child("rooms"));

    return {
      all: rooms 
    }
  }]);