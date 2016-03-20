angular.module("app",[]).controller('mvNavbarController', function($scope) {
   $scope.signIn=function(username, password){
       alert("Hello from ng-controller, "+username+". Thanks for dropping by, but I am not done yet.");
   }
});