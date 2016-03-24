var app=angular.module('app', []);
app.controller('mainCtrl', function($scope) {
    var leaves = ['#headingThree', '#headingFour', '#headingFive', '#headingSix'];
    for (book = 0; book < 16; book++) {
        leaves.push("#books"+book.toString());
    }
    $scope.highlightString = function(str) {
        var standalone = $(str);
        if (standalone.hasClass('others')) {
            standalone.removeClass('others');
            var foo;
            for (foo = 0; foo < leaves.length; foo++) {
                $(leaves[foo]).removeClass('highlight');
                $(leaves[foo]).addClass('others');
            }
        }
        standalone.addClass('highlight');
    };
    $scope.turn = function(str) {
        var chevron = $(str);
        if (chevron.hasClass('spin')) {
            chevron.removeClass('spin');
            chevron.addClass('spinBackwards');
        }
        else {
            if (chevron.hasClass('spinBackwards')) chevron.removeClass('spinBackwards');
            chevron.addClass('spin');
        }
    };
    $scope.subcat_1=[{tag: 'school0', title: 'Primary school textbooks'},{tag: 'school1', title: 'Primary school notes & supplementary exercises'},{tag: 'school2', title:'Secondary school textbooks'}, {tag: 'school3', title: 'Secondary school notes & supplementary exercises'}, {tag: 'school4', title: 'Stationery'}];
    $scope.subcat_2=[{tag: 'books0', title: 'Fiction'},{tag: 'books1', title: 'Arts'},{tag: 'books2', title:'Cookbooks'}, {tag: 'books3', title: 'Science'}, {tag: 'books4', title: 'Computer Science'}, {tag: 'books5', title: 'Sociology'}, {tag: 'books6', title: 'Engineering'},  {tag: 'books7', title: 'Politics'}, {tag: 'books8', title: 'Religion & Spirituality'}, {tag: 'books9', title: 'Philosophy'}, {tag: 'books10', title: 'Law'}, {tag: 'books11', title: 'Metaphysics'},{tag: 'books12', title: 'Lifestyle'}, {tag: 'books13', title: 'History, Biographies & Memoirs'}, {tag: 'books14', title: 'Reference works'}, {tag: 'books15', title: 'Periodicals'}];
});
app.controller('mvNavbarController', function($scope) {
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
//angular.module('app').config(function($routeProvider, $locationProvider) {
//   $locationProvider.html5Mode(true).when('/', {controller:'mainCtrl'});
//});