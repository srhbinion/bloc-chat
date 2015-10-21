<!DOCTYPE html> 
<!--Angular name -->
<html ng-app="bChat"> 
    <!--english -->
    <head lang="en"> 
        <meta charset="UTF-8"> 
        <!--responsive -->
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <!--open sans -->
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:400,800,600,700,300"> 
        <!--icon font -->
        <link rel="stylesheet" type="text/css" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"> 
        <!--Link to Keep it Short: Organized Page of Style Sheets -->
        <link rel="stylesheet" type="text/css" href="/styles/app.css"> 
        <title>Bloc Chat</title>
    </head> 
    <body class="landing">
        <!-- =============================Nav Bar============================= -->
        <nav class="navbar">  
        </nav>
        <!-- ===============================Views=============================== -->
        <div ui-view>
        </div>
        <!-- ========================Frameworks + Libraries===================== -->
        <!-- Angular --> 
        <script src="/scripts/angular.js"></script> 
        <!-- UI Router -->
        <script src="/scripts/angular-ui-router.js"></script>   
        <!--Firebase JavaScript Library-->
        <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
        <!-- My Realtime Database -->
        <script>var myDataRef = new Firebase('https://tqi39uk8hjs.firebaseio-demo.com/');</script>
        <!-- JQuery -->
        <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
        <!-- =========================Custom Scripts============================ -->
        <script src="/scripts/app.js"></script>
        <script src="/scripts/fixtures.js"></script>
        
    </body>
</html>
    