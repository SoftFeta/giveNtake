angular.module("app",[]).controller('mvNavbarController', function($scope) {
   $scope.signIn=function(username, password){
       toastr.clear();
       if (typeof username === 'undefined' || username == '') {
           if (typeof password  === 'undefined' || password == '') toastr.error("You did not enter anything!");
           else toastr.error("You did not enter your user name!");
       } else {
           if (typeof password  === 'undefined' || password == '') toastr.error("You did not enter your password!");
           else toastr.error("Invalid username or password!");
       }
       //Hello from ng-controller, "+username+". Thanks for dropping by, but I am not done yet.
   }
});