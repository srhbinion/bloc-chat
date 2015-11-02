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
    //accesses "room" array
    $scope.chatRooms = Room.allRooms;
    // adds item to the "room" array
    $scope.addChatRoom = Room.addChatRoom;
    // removes item from "room" array
    $scope.removeChatRoom = Room.removeChatRoom;
    //prints out "room" clicked on
    $scope.selectCurrentRoom = Room.setRoom;
}]);

binChat.controller("ChatController", ["$scope", "$firebaseArray","Room", function ($scope, $firebaseArray, Room) {
    //accesses "room" array
    $scope.chatRooms = Room.allRooms;
    //test to ensure expressions are linked to controller
    $scope.party = "Party";
    //display selected "room" arry in chat.html view
    $scope.currentRoom = Room.setRoom();
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
    
    this.activeRoom = null;
 
    return {
        //accesses firebase array 
        allArray: fbArray,
        //accesses "room" array
        allRooms: rooms,
        // adds item to the "room" array
        addChatRoom: function(room){
            this.chatRooms.$add({
                name: this.newMessageText,
                type: "Room"
            });
            this.newMessageText =[];   
        },
        // removes item to the "room" array
        removeChatRoom: function(room){
            this.chatRooms.$remove(room); 
        },
        // returns "room" in "chatRooms"
        setRoom: function(room){
            console.log(room);
            return room;
        }
    };
}]);

    //trying to get current room from line 62
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