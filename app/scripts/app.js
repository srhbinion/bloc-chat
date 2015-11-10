/**
 * Establishes Angular framework and other plugins
 * @param  {function} UI router   - framework to enhance routing and states
 * @param  {function} firebase  - data storage site. https://binchat.firebaseio.com/
 * @param  {function} bootstrap  - prebuilt libaray of features. Used this feature to prompt a modal
 * @param  {function} ngCookies  - common way to store a string in your browser. Used to store username
 */
var binChat = angular.module("binChat", ["ui.router","firebase","ui.bootstrap","ngCookies"]);

/**
 * Configuration for the angular site views and linking the controllers
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider  - removes errors and hashbangs from address
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
		.state("modal",{
			// properties of the state listed in "controller"
			url: "#",
			controller:"UserModalInstanceCtrl",
			templateUrl:"/templates/myModalContent.html"
    });
    $stateProvider
		.state("landing",{
			// properties of the state listed in "controller"
			url: "/index.html",
			controller:"LandingController",
			templateUrl:"/templates/landing.html"
    });
});

/**
 * Stops the loading of the page and promps the user to sign in with a username. Cookie stores the user name.
 * @param  {function} $cookie    - html code for displaying differnt views
 */
binChat.run(["$cookies", "$modal", function ($cookies, $modal) {
   if(!$cookies.binChatCurrentUser || $cookies.binChatCurrentUser === " "){
       console.log("Javascript is magic");
       var getUserName = $cookies.get("binChatCurrentUser");
       console.log(getUserName);
       
       $modal.open({
           templateUrl:"/templates/myModalContent.html",
           controller: "ModalInstanceCtrl",
           size: "sm"
       });
   }
}]);

/**
 * Controls the landing view and the creation and subtraction of chat rooms.
 * @return {array}  - adds and removes chat rooms in the firebase array for rooms
 */
binChat.controller("LandingController", ["$scope", "$firebaseArray","Room", function($scope, $firebaseArray, Room) {
    //welcome text in body panel
    $scope.welcome = "Welcome, to Bloc Chat";
    //creates a random user numbers - TODO add ability to creat custom usernames
    $scope.userName = "user " + Math.round(Math.random()*(1-50));
    //"room" array features
    $scope.chatRooms = {
        //accesses "room" array
        room: Room.allRooms,
        // adds item to the "room" array
        add: function(room){
            //adds this information to new "room" item in array
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
        //shows the selected room as current room
        set: function(room){
            //toggles between rooms in bodypanel
            $scope.currentRoom = !$scope.currentRoom;
            //ability to call selected room name information
            $scope.current = {
                name: room.name,
                roomId: room.$id
            };
        }
    };
    //"message" array
    $scope.messages = Room.allMessages;
    //"message" array features
    $scope.chatMessages = {
        //accesses "message" array
        messages: Room.allMessages,
        // adds item to the "Messages" array
        add: function(msgText) {
            $scope.chatMessages.messages.$add({
                //userName: $scope.userName,
                content: $scope.msgText,
                sentAt: Date.now(),
                roomId: $scope.current.roomId
            });
            // temp holding array for new message information
            $scope.msgText =[];
        },
        // removes item from "Messages" array
        remove: function(msgText){
            $scope.chatMessages.messages.$remove(msgText); 
        }
    };
}]);

binChat.controller("ModalInstanceCtrl", ["$scope", "$modalInstance", "$cookieStore", "Room", function($scope, $modalInstance, $cookieStore, Room) { 
    $scope.userName = {
        add: function(name) {
            console.log("ok");
            $cookieStore.put("binChatCurrentUser", name);
            $modalInstance.close();
        },
        remove: function(name) {
            console.log("out");
            $cookieStore.remove("binChatCurrentUser", name);
            $modalInstance.close();
        },
        cancel: function () {
            $modalInstance.dismiss("cancel");
        }
        //set: function(){
        //    $scope.getName = $cookieStore.get("binChatCurrentUser");
        //}
    };
}]);

/**
 * Ability to access the firebase database and the child arrays that contain messages and rooms from anywhere on site
 * @param  {database} firebase  - data storage site. https://binchat.firebaseio.com/
 */
binChat.factory("Room", ["$firebaseArray", function($firebaseArray) {
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