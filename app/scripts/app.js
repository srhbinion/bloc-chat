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
        .state("chat",{
			// properties of the state listed in "controller"
			url: "/chat.html",
			controller:"ChatController",
			templateUrl:"/templates/chat.html"
		});
});

/**
 * Controls the landing view
 * @return {}  - 
 * @return {}  - 
 */
binChat.controller("LandingController", ["$scope", "$firebaseArray","Room", function($scope, $firebaseArray, Room) {
    $scope.welcome = "Welcome, to Bloc Chat";
    //accesses room array
    $scope.chatRooms = Room.all;
    //accesses general array
    $scope.messages = Room.alt;
    // the room is added to the room array
    $scope.addMessage = function(room) {
        $scope.chatRooms.$add({
            name: $scope.newMessageText,
            type: "Room"
        });
        $scope.newMessageText =[];
    };
    // remove item from the array
    $scope.removeMessage = function(room) {
        $scope.chatRooms.$remove(room);
    };
}]);

binChat.controller("SubmitController", ["$scope", "$firebaseArray","Room", function ($scope, $firebaseArray, Room) {
    //$scope.chatRooms = Room.all;
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
    // create a synchronized array
    var fbArray = $firebaseArray(firebaseRef);
    // create a synchronized array with 
    var rooms = $firebaseArray(firebaseRef.child("rooms"));
    
    return {
      all: rooms,
      alt: fbArray
      }
  }]);