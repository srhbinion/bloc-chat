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
		})
        .state("account",{
			// properties of the state listed in "account"
			url: "/account.html",
			controller:"AccountController",
			templateUrl:"/templates/account.html"
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

bChat.controller("SumbitController", ["$scope", function($scope) {
    $scope.welcome = "Welcome, to Bloc Chat";
}]);

bChat.controller("AccountController", ["$scope", function($scope) {
    $scope.welcome = "Welcome, to Bloc Chat";
}]);

//query a list of Rooms
bChat.factory('Room', ['$firebaseArray', function($firebaseArray) {
  var firebaseRef = new Firebase("https://tqi39uk8hjs.firebaseio-demo.com/");
}]);

//either query an existing set of data or reference one you intend to populate with data in the future
bChat.factory('Room', ['$firebaseArray', function($firebaseArray) {

  var firebaseRef = new Firebase("https://tqi39uk8hjs.firebaseio-demo.com/");
  
  var rooms = $firebaseArray(firebaseRef.child('rooms'));

  return {
    all: rooms
  };
}]);