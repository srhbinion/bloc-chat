/**
 * Establishes Angular framework and other plugins
 * @param  {function} UI router   - framework to enhance routing and states
 * @param  {function} firebase  - data storage site. https://binchat.firebaseio.com/
 */
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
 * Controls the landing view and the creation and subtraction of chat rooms.
 * @return {array}  - adds and removes chat rooms in the firebase array for rooms
 */
binChat.controller("LandingController", ["$scope", "$firebaseArray","Room", function($scope, $firebaseArray, Room) {
    //welcome text in body panel
    $scope.welcome = "Welcome, to Bloc Chat";
    //accesses room array
    $scope.chatRooms = Room.all;
    //accesses general array - TODO: Delete; Not used in this controller.
    $scope.messages = Room.alt;
    // adds item to the room array
    $scope.addMessage = function(room) {
        $scope.chatRooms.$add({
            name: $scope.newMessageText,
            type: "Room"
        });
        $scope.newMessageText =[];
    };
    // removes item from the array
    $scope.removeMessage = function(room) {
        $scope.chatRooms.$remove(room);
    };
    $scope.setCurrentRoom = function(room){
        console.log(room);
        return room;
    };
}]);

binChat.controller("ChatController", ["$scope", "$firebaseArray","Room", function ($scope, $firebaseArray, Room) {
    //accesses room array
    $scope.chatRooms = Room.all;
    //accesses general array
    $scope.messages = Room.alt;
    $scope.party = "Party";
    //trying to get current room from line 62
    $scope.getCurrentRoom = function(name){
        if (name == true){
            console.log("yes")
        } else {
            console.log("try again")
        };
    };
    //ADD MESSAGE METHOD
    //$scope.addMessage = function(e) {
    //    //LISTEN FOR RETURN KEY
    //    if (e.keyCode === 13 && $scope.msg) {
    //        //ALLOW CUSTOM OR ANONYMOUS USER NAMES
    //        var name = $scope.name || "anonymous";
    //        $scope.messages.$add({ from: name, body: $scope.msg });
    //        //RESET MESSAGE
    //        $scope.msg = "";
    //     }
    //}
}]);
/**
 * Ability to access the firebase database from anywhere on site
 * @param  {database} firebase  - data storage site. https://binchat.firebaseio.com/
 */
binChat.factory("Room", ['$firebaseArray', function($firebaseArray) {
    // link to app's firebase database
    var firebaseRef = new Firebase("https://binchat.firebaseio.com/");
    // create a synchronized general array
    var fbArray = $firebaseArray(firebaseRef);
    // create a synchronized room array
    var rooms = $firebaseArray(firebaseRef.child("rooms"));
    
    return {
        //accesses general array
        alt: fbArray,
        //accesses room array
        all: rooms
        }
  }]);