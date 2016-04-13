var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(function ($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(true);
});

app.controller('mainCtrl', function ($scope, $http, $sce, mvIdentity) {
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
    //Search
    $scope.search_keyword = null;
    $scope.search_cat = null;
    $scope.search_neighbourhood = null;

    $http.get('bric_a_brac.json').then(function (response) {
        var dummyItem_0 = {
            id: 3,
            pic: {data: response.data.image[0], contentType: 'image/png'},
            giver: 'joeBloggs',
            taker: 'billLiu',
            clickTime: new Date(),
            trending: true,
            newListing: true,
            name: 'A Lump of Coal',
            cat: 'Junk',
            subcat: 'Interesting junk',
            neighbourhood: 'psk',
            quantity: 1,
            desc: $sce.trustAsHtml("Uh-oh."),
            getTime: new Date(),
            status: 0
        };
        var dummyItem_1 = {
            id: 9,
            pic: {data: response.data.image[1], contentType: 'image/png'},
            giver: 'billLiu',
            taker: 'joeBloggs',
            clickTime: new Date(),
            trending: true,
            newListing: false,
            name: 'Some Pieces of Wool',
            cat: 'Material',
            subcat: null,
            neighbourhood: 'cuhk',
            quantity: 3,
            desc: $sce.trustAsHtml("no description"),
            getTime: new Date(),
            status: 0
        };
        var dummyItem_2 = {
            id: 81,
            pic: {data: response.data.image[1], contentType: 'image/png'},
            giver: 'billLiu',
            taker: 'joeBloggs',
            clickTime: new Date(),
            trending: false,
            newListing: true,
            name: 'Some Pieces of Wool',
            cat: 'Material',
            subcat: null,
            neighbourhood: 'cuhk',
            quantity: 2,
            desc: $sce.trustAsHtml('<div style="font-family: ' + "'times new roman'; color: firebrick; font-size: 48px; font-weight: bold; font-style: italic; text-decoration: underline;" + '">Description with formatting!</style>'),
            getTime: new Date(),
            status: 0
        };
        var dummyItem_3 = {
            id: 6561,
            pic: {data: response.data.image[2], contentType: 'image/png'},
            giver: 'billLiu',
            taker: 'joeBloggs',
            clickTime: new Date(),
            trending: false,
            newListing: false,
            name: 'Utah Teapots',
            cat: 'Junk',
            subcat: 'Bric-à-brac',
            neighbourhood: 'cuhk',
            quantity: 4,
            desc: $sce.trustAsHtml("The <kbd>ng-repeat</kbd> directive of AngularJS is used to show items."),
            getTime: new Date(),
            status: 0
        };
        $scope.nextTen = [dummyItem_0, dummyItem_1, dummyItem_2, dummyItem_3];
    });

    $scope.search = function (keyword, cat, neighbourhood) {
        console.log(keyword);
        console.log(cat);
        console.log(neighbourhood);
        toastr.clear();
        toastr.info("Server maintenence");
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
                    mvAuth.authenticateUser(username, password).then(function (success) {
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
            mvAuth.logoutUser().then(function () {
                $scope.username = "";
                $scope.password = "";
                toastr.success("Logged out");
                $location.path('/');
            })
        }
    }
);

app.controller('mvSignUpController', function ($scope, mvAuth, $window, $timeout) {

    var firstName = $('#inputFirstName'),
        lastName = $('#inputLastName'),
        username = $('#inputUser'),
        password = $('#inputPassword'),
        firstNameContainer = $('#firstNameContainer'),
        lastNameContainer = $('#lastNameContainer'),
        userContainer = $('#userContainer'),
        passwordContainer = $('#passwordContainer'),
        regex = /^((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,20})$/
    firstName.focusout(function () {
        if (firstName.val().length > 0 && !firstName.hasClass('form-control-danger')) {
            firstNameContainer.addClass('has-success');
            firstName.addClass('form-control-success');
        }
    });
    lastName.focusout(function () {
        if (lastName.val().length > 0 && !lastName.hasClass('form-control-danger')) {
            lastNameContainer.addClass('has-success');
            lastName.addClass('form-control-success');
        }
    });
    username.focusout(function () {
        if (username.val().length > 0 && !username.hasClass('form-control-danger')) {
            userContainer.addClass('has-success');
            username.addClass('form-control-success');
        }
    });
    password.focusout(function () {
        if (password.val().match(regex) != null) {
            passwordContainer.removeClass('has-danger');
            password.removeClass('form-control-danger');
            passwordContainer.addClass('has-success');
            password.addClass('form-control-success');
        }
    });

    $scope.signUp = function () {
        boolval = true;
        if ($scope.fname == undefined || !($scope.fname.length >= 1)) {
            console.log("Bad first name");
            boolval = false;
            firstNameContainer.removeClass('has-success');
            firstName.removeClass('form-control-success');
            firstNameContainer.addClass('has-danger');
            firstName.addClass('form-control-danger');
        }
        if ($scope.lname == undefined || !($scope.lname.length >= 1)) {
            console.log("Bad last name");
            boolval = false;
            lastNameContainer.removeClass('has-success');
            lastName.removeClass('form-control-success');
            lastNameContainer.addClass('has-danger');
            lastName.addClass('form-control-danger');
        }
        if ($scope.reg_username == undefined || !($scope.reg_username.length >= 1)) {
            console.log("Bad username");
            boolval = false;
            userContainer.removeClass('has-success');
            username.removeClass('form-control-success');
            userContainer.addClass('has-danger');
            username.addClass('form-control-danger');
        }
        if ($scope.reg_password == undefined || $scope.reg_password.match(regex) == null) {
            console.log("Bad password");
            boolval = false;
            passwordContainer.removeClass('has-success');
            password.removeClass('form-control-success');
            passwordContainer.addClass('has-danger');
            password.addClass('form-control-danger');
        }
        //$('#signUpButton').click(function() {
        //    $('#failed').show();
        //    firstName.addClass('form-control-danger');
        //    firstNameContainer.addClass('has-danger');
        //    lastName.addClass('form-control-danger');
        //    lastNameContainer.addClass('has-danger');
        //    username.addClass('form-control-danger');
        //    userContainer.addClass('has-danger');
        //    password.addClass('form-control-danger');
        //    passwordContainer.addClass('has-danger');
        //});
        if (boolval == true) {
            console.log('Hi');
            var newUserData = {
                username: $scope.reg_username,
                password: $scope.reg_password,
                firstName: $scope.fname,
                lastName: $scope.lname
            };
            mvAuth.createUser(newUserData).then(function () {
                console.log('Called');
                var myToast=toastr.success("Something", "Welcome to Bountiful!", {timeOut: 0});
                var count=4;
                loop = function () {
                    count--;
                    if (count > 0) {
                        $timeout(loop,1000);
                        $(myToast).children('.toast-message').html("You will be redirected in "+count+" seconds.");
                    }
                    else {
                        $window.location.href = '../';
                    }
                };
                loop();
            }, function (reason) {
                console.log('Error');
                toastr.error(reason);
            });
        }
    }
});

app.controller('submitCtrl', function($scope) {
    $scope.submitItem = function () {
        console.log($scope.name);
        console.log($scope.quantity);
        console.log($scope.pic);
        console.log($scope.desc);
        console.log($scope.tags);
        toastr.clear();
        toastr.info("Server maintenence");
    };
});

app.factory('mvUser', function ($resource) {
    var userResource = $resource('/api/users/:id', {_id: "@id"});

    userResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    };
    return userResource;
});

app.factory('mvIdentity', function ($window, mvUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    }
});

app.factory('mvAuth', function ($http, mvIdentity, mvUser, $q) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        createUser: function (newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();
            newUser.$save().then(function () {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        }
    }
});