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
    $scope.messages = Room.alt;
    $scope.items = ["Travel Room", "Water Room", "Dogs Room"];
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addMessage = function() {
        $scope.messages.$add({
            name: $scope.newMessageText
        });
    };
}]);

binChat.controller("SubmitController", ["$scope", "$firebaseArray","Room", function ($scope, $firebaseArray, Room) {
    $scope.chatRooms = Room.all;
    $scope.messages = Room.alt;
    //ADD MESSAGE METHOD
    $scope.addMessage = function(e) {
        //LISTEN FOR RETURN KEY
        if (e.keyCode === 13 && $scope.msg) {
            //ALLOW CUSTOM OR ANONYMOUS USER NAMES
            var name = $scope.name || "anonymous";
            $scope.messages.$add({ from: name, body: $scope.msg });
            //RESET MESSAGE
            $scope.msg = "";
        }
    }
}]);

binChat.factory("Room", ['$firebaseArray', function($firebaseArray) {
    // link to app's firebase array
    var firebaseRef = new Firebase("https://binchat.firebaseio.com/");
    // download the data into a local object
    var rooms = $firebaseArray(firebaseRef.child("rooms"));
    // create a synchronized array
    var fb = $firebaseArray(firebaseRef);

    return {
      all: rooms,
      alt: fb
      }
  }]);