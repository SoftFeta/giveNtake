var app = angular.module('app', []);

app.controller('mainCtrl', function ($scope, mvIdentity) {
    $scope.search_keyword=null;
    $scope.search_cat=null;
    $scope.search_neighbourhood=null;
    $scope.identity = mvIdentity;
    var leaves = ['#headingThree', '#headingFour', '#headingFive', '#headingSix'];
    $scope.subcat_1 = [{tag: 'school0', title: 'Primary school textbooks'}, {
        tag: 'school1',
        title: 'Primary school notes & supplementary exercises'
    }, {tag: 'school2', title: 'Secondary school textbooks'}, {
        tag: 'school3',
        title: 'Secondary school notes & supplementary exercises'
    }, {tag: 'school4', title: 'Stationery'}];
    $scope.subcat_2 = [{tag: 'books0', title: 'Fiction'}, {tag: 'books1', title: 'Arts'}, {
        tag: 'books2',
        title: 'Cookbooks'
    }, {tag: 'books3', title: 'Science'}, {tag: 'books4', title: 'Computer Science'}, {
        tag: 'books5',
        title: 'Sociology'
    }, {tag: 'books6', title: 'Engineering'}, {tag: 'books7', title: 'Politics'}, {
        tag: 'books8',
        title: 'Religion & Spirituality'
    }, {tag: 'books9', title: 'Philosophy'}, {tag: 'books10', title: 'Law'}, {
        tag: 'books11',
        title: 'Metaphysics'
    }, {tag: 'books12', title: 'Lifestyle'}, {tag: 'books13', title: 'History, Biographies & Memoirs'}, {
        tag: 'books14',
        title: 'Reference works'
    }, {tag: 'books15', title: 'Periodicals'}];
    $scope.subcat_5 = [{tag: 'music0', title: 'Musical Instruments (full/components)'}, {
        tag: 'music1',
        title: 'Musical instruments accesories (e.g. woodwind reeds, guitar picks, instrument stands)'
    }, {tag: 'music2', title: 'Manuscripts'}];
    $scope.subcat_6 = [{tag: 'books0', title: 'Fiction'}, {tag: 'books1', title: 'Arts'}, {
        tag: 'books2',
        title: 'Cookbooks'
    }, {tag: 'books3', title: 'Science'}, {tag: 'books4', title: 'Computer Science'}, {
        tag: 'books5',
        title: 'Sociology'
    }, {tag: 'books6', title: 'Engineering'}, {tag: 'books7', title: 'Politics'}, {
        tag: 'books8',
        title: 'Religion & Spirituality'
    }, {tag: 'books9', title: 'Philosophy'}, {tag: 'books10', title: 'Law'}, {
        tag: 'books11',
        title: 'Metaphysics'
    }, {tag: 'books12', title: 'Lifestyle'}, {tag: 'books13', title: 'History, Biographies & Memoirs'}, {
        tag: 'books14',
        title: 'Reference works'
    }, {tag: 'books15', title: 'Periodicals'}];
    var subcats = [];
    subcats.push($scope.subcat_1);
    subcats.push($scope.subcat_2);
    subcats.push($scope.subcat_5);
    subcats.push($scope.subcat_6);
    console.log(subcats[1][1].tag);
    var foo;
    for (foo = 0; foo < subcats.length; foo++) {
        for (bar = 0; bar < subcats[foo].length; bar++) {
            leaves.push("#" + subcats[foo][bar].tag);
        }
    }
    $scope.highlightString = function (str) {
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
    $scope.turn = function (str) {
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
});

app.controller('mvNavbarController', function ($scope, $http, mvIdentity, mvAuth, $location) {
        $scope.greet = function () {
            var currentDate = new Date();
            var hour = currentDate.getHours();
            var greeting;
            if (hour < 6 || (hour > 19 && hour < 24)) {
                greeting = "Good night";
            } else if (hour < 12) {
                greeting = "Good morning";
            } else if (hour < 15) {
                greeting = "Good afternoon";
            } else {
                greeting = "Good evening";
            }
            return greeting;
        };

        $scope.identity = mvIdentity;
        $scope.signIn = function (username, password) {
            toastr.clear();
            if (typeof username === 'undefined' || username == '') {
                if (typeof password === 'undefined' || password == '') toastr.error("You did not enter anything!");
                else toastr.error("You did not enter your user name!");
            } else {
                if (typeof password === 'undefined' || password == '') toastr.error("You did not enter your password!");
                else {
                    mvAuth.authenticateUser(username, password).then(function(success) {
                        if (success) {
                            toastr.success("Logged in");
                        } else {
                            toastr.error("Invalid username or password!");
                        }
                    });
                }
            }
        };
        $scope.signOut = function () {
            mvAuth.logoutUser().then(function() {
                $scope.username="";
                $scope.password="";
                toastr.success("Logged out");
                $location.path('/');
            })
        }
    }
);

app.factory('mvIdentity', function ($window) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = $window.bootstrappedUserObject;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    }
});

app.factory('mvAuth', function ($http, mvIdentity, $q) {
    return {
        authenticateUser: function(username, password) {
            var dfd=$q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    mvIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function() {
            var dfd=$q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }
    }
});

//angular.module('app').config(function($routeProvider, $locationProvider) {
//   $locationProvider.html5Mode(true).when('/', {controller:'mainCtrl'});
//});