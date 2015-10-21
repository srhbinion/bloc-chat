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
			url: "/index",
			controller:"LandingController",
			templateUrl:"/templates/landing.html"
		});
});

/**
 * Controls the landing view
 * @return {}  - 
 * @return {}  - 
 */
bChat.controller("LandingController", ["$scope", function($scope) {
    $scope.welcome = "Welcome!";
}]);