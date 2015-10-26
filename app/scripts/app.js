var bChat = angular.module("bChat", ["ui.router", "firebase"]);

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
        .state("submit",{
			// properties of the state listed in "controller"
			url: "/submit.html",
			controller:"SubmitController",
			templateUrl:"/templates/submit.html"
		});
});

bChat.factory("chatMessages", ["$firebaseArray", function ($firebaseArray) {
    // create a reference to the database where we will store our data
    var randomRoomId = Math.round(Math.random() * 100000000);
    //reference to firebase
    var messageRef = new Firebase("https://radiant-fire-5615.firebaseio.com/" + randomRoomId);
    
    return $firebaseArray(messageRef);
}]);

/**
 * Controls the landing view
 * @return {}  - 
 * @return {}  - 
 */
bChat.controller("LandingController", ["$scope", function ($scope) {
    //reference to firebase
    var messageRef = new Firebase("https://radiant-fire-5615.firebaseio.com/");
    
    $scope.welcome = "Welcome, to Bloc Chat";
    
    //$scope.nameField = $("#nameInput");
}]);

bChat.controller("SubmitController", ["$scope", function ($scope) {
    //reference to firebase
    var messageRef = new Firebase("https://radiant-fire-5615.firebaseio.com/");
    
    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    $scope.messages = $firebaseArray(messageRef);
    
    // create a query for the most recent 25 messages on the server
    var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    
    // the $firebaseArray service properly handles database queries as well
    $scope.filteredMessages = $firebaseArray(query);

}]);