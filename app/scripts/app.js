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
    //welcome text in body panel
    $scope.request = "Do you want to chat today?";
    //accesses "room" array
    $scope.chatRooms = {
        room: Room.allRooms,
        // adds item to the "room" array
        add: function(room){
            $scope.chatRooms.room.$add({
                name: $scope.newRoomName,
                type: "Room"
            });
            $scope.newRoomName =[];  
        },
        // removes item from "room" array
        remove: function(room){
            $scope.chatRooms.room.$remove(room); 
        },
        //shows the selected room to current room
        set: function(room){
            //hides and shows content in body panel
            $scope.currentRoom = !$scope.currentRoom;
            //displays selected room name
            $scope.current = {
                name: room.name,
                roomId: room.$id
            };
        }
    };
    $scope.chatMessages = {
        //accesses "message" array
        messages: Room.allMessages,
        // adds item to the "Messages" array
        add: function(msgText) {
            $scope.chatMessages.messages.$add({
                userName: "name",
                content: $scope.msgText,
                sentAt: Date.now(),
                roomId: $scope.current.roomId
            });
            $scope.msgText =[];   //change to msgText
        }
    };
}]);

binChat.controller("ChatController", ["$scope", "$firebaseArray","Room", function ($scope, $firebaseArray, Room) {
    //Maybe I don't need this
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
    // create a synchronized messages array
    var messages = $firebaseArray(firebaseRef.child("messages"));
 
    return {
        //accesses firebase array 
        allArray: fbArray,
        //accesses "room" array
        allRooms: rooms,
        //accesses "messages" array
        allMessages: messages
    };
}]);