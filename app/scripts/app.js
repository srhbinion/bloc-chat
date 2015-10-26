var bChat = angular.module("bChat", ["ui.router"]);

/**
 * Configuration for the angular site views and linking the controllers
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider)  - removes errors and hashbangs from address
 */
bChat.config(function($locationProvider, $stateProvider) {
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
        .state("sumbit",{
			// properties of the state listed in "controller"
			url: "/sumbit.html",
			controller:"SumbitController",
			templateUrl:"/templates/sumbit.html"
		});
});

/**
 * Controls the landing view
 * @return {}  - 
 * @return {}  - 
 */
bChat.controller("LandingController", ["$scope", function($scope) {
    $scope.welcome = "Welcome, to Bloc Chat";
}]);

bChat.controller("SumbitController", "$firebaseArray", ["$scope", function($scope, $firebaseArray) {
    var messageRef = new Firebase("https://radiant-fire-5615.firebaseio.com/");
    
    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    $scope.message = $firebaseArray(messageRef);
    
    // create a query for the most recent 30 messages on the server
    var query = messageRef.orderByChild("timestamp").limitToLast(30);
    
    $scope.filteredMessages = $firebaseArray(query);
}]);

bChat.factory("Room", ["$firebaseArray", function ($scope, $firebaseArray) {
    var firebaseRef = new Firebase("https://radiant-fire-5615.firebaseio.com/");
    
    //var rooms = $firebase(firebaseRef); 
    
    var rooms = $firebase(firebaseRef.child("rooms"));
    
    return {
        all: rooms
    };
}]);