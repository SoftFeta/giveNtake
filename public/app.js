var app = angular.module('app', ['ngRoute', 'ngResource', 'ngTable']).config(function ($locationProvider, $routeProvider) {
    var routeRoleTf = {
        admin: {
            auth: function (mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin')
            }
        },
        user: {
            auth: function (mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('user')
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {templateUrl: '/partials/main'});
    $routeProvider.when('/accounts', {templateUrl: '/partials/accounts', resolve: routeRoleTf.admin});
    $routeProvider.when('/current', {templateUrl: '/partials/current'});
    $routeProvider.when('/main', {templateUrl: '/partials/gmap'});
    $routeProvider.when('/profile', {templateUrl: '/partials/profile', resolve: routeRoleTf.user});
    $routeProvider.when('/register', {templateUrl: '/partials/register'});
    $routeProvider.when('/search', {templateUrl: '/partials/search'});
    $routeProvider.when('/submit', {templateUrl: '/partials/submit'});
    $routeProvider.otherwise({templateUrl: '/partials/404'});
});

app.controller('mainCtrl', function ($scope, $http, $sce, mvIdentity) {

    $scope.setModal = function (name, reporter, giver) {
        var d = new Date();
        var datestring = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
            d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
        $('#report_item_form_label').html("<i class='fa fa-flag'></i> Report item: " + name);
        $('#report_item_form_datetime').attr('placeholder', datestring);
        $('#report_item_form_reporter_name').attr('placeholder', reporter);
        $('#report_item_form_item_name').attr('placeholder', giver);
    };
    $scope.modalSubmit = function () {
        toastr.success("The report will soon be reviewed by the administrators.", "Thanks for reporting");
    };
    $scope.identity = mvIdentity;
    var leaves = ['#headingThree', '#headingFour', '#headingFive', '#headingSix', '#headingSeven'];
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
        userName = $('#inputUser'),
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
    userName.focusout(function () {
        if (userName.val().length > 0 && !userName.hasClass('form-control-danger')) {
            userContainer.addClass('has-success');
            userName.addClass('form-control-success');
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
            userName.removeClass('form-control-success');
            userContainer.addClass('has-danger');
            userName.addClass('form-control-danger');
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
        //    userName.addClass('form-control-danger');
        //    userContainer.addClass('has-danger');
        //    password.addClass('form-control-danger');
        //    passwordContainer.addClass('has-danger');
        //});
        if (boolval == true) {
            console.log('Hi');
            var newUserData = {
                userName: $scope.reg_username,
                firstName: $scope.fname,
                lastName: $scope.lname,
                password: $scope.reg_password,
                roles: ['user'],
                status: 0
            };
            mvAuth.createUser(newUserData).then(function () {
                console.log('Called');
                var myToast = toastr.success("Something", "Welcome to Bountiful!", {timeOut: 0});
                var count = 4;
                loop = function () {
                    count--;
                    if (count > 0) {
                        $timeout(loop, 1000);
                        $(myToast).children('.toast-message').html("You will be redirected in " + count + " seconds.");
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

app.controller('submitCtrl', function ($scope, $window, $timeout, mvItemAuth) {
    $scope.subcats = [{tag: 'school0', title: 'Primary school textbooks'}, {
        tag: 'school1',
        title: 'Primary school notes & supplementary exercises'
    }, {tag: 'school2', title: 'Secondary school textbooks'}, {
        tag: 'school3',
        title: 'Secondary school notes & supplementary exercises'
    }, {tag: 'school4', title: 'Stationery'}, {tag: 'books0', title: 'Fiction'}, {tag: 'books1', title: 'Arts'}, {
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
    }, {tag: 'books15', title: 'Periodicals'}, {tag: 'music0', title: 'Musical Instruments (full/components)'}, {
        tag: 'music1',
        title: 'Musical instruments accesories (e.g. woodwind reeds, guitar picks, instrument stands)'
    }, {tag: 'music2', title: 'Manuscripts'}, {tag: 'books0', title: 'Fiction'}, {tag: 'books1', title: 'Arts'}, {
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
    //Break
    $scope.submitItem = function () {
        if ($scope.tags == undefined) $scope.tags = '';
        else if (typeof $scope.tags === 'string') {
            $scope.tags = $scope.tags.split(',');
            console.log("Not array");
        }
        var newItemData = {
            name: $scope.name,
            clickTime: new Date(),
            cat: $scope.cat,
            pic: $scope.pic,
            trending: false,
            newListing: true,
            quantity: $scope.quantity,
            desc: $scope.desc,
            neighbourhood: document.getElementById('area').getAttribute('abbr'),
            tags: $scope.tags
        };
        console.log("Name: " + $scope.name);
        console.log("Category: " + $scope.cat);
        console.log("Quantity: " + $scope.quantity);
        console.log("Pic: " + $scope.pic);
        console.log("Desc: " + $scope.desc);
        console.log("Neighbourhood: " + document.getElementById('area').getAttribute('abbr'));
        console.log("Tags: " + $scope.tags);
        mvItemAuth.createItem(newItemData).then(function () {
            console.log('Called');
            var myToast = toastr.success("Something", "Item added!", {timeOut: 0});
            var count = 4;
            loop = function () {
                count--;
                if (count > 0) {
                    $timeout(loop, 1000);
                    $(myToast).children('.toast-message').html("You will be redirected in " + count + " seconds.");
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
    };
});

app.controller('accountsCtrl', function ($scope, mvUser, NgTableParams) {
    $scope.accounts = mvUser.query();
    console.log($scope.accounts);
    $scope.tp = new NgTableParams({
        page: 1,
        count: 10
    }, {dataset: $scope.accounts});
});

//app.factory('catalog');
app.factory('mvItem', function ($resource) {
    var itemResource = $resource('/api/items/:id', {_id: "@id"});
    return itemResource;
});

app.factory('mvItemAuth', function ($resource, $q, mvItem) {
    return {
        createItem: function (newItemData) {
            var newItem = new mvItem(newItemData);
            var dfd = $q.defer();
            newItem.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        }
    }
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
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
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
        authorizeAuthenticatedUserForRoute: function () {
            if (mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authenticated');
            }
        },
        authorizeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();
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

app.controller('tableController', function ($scope, $filter, ngTableParams) {
    //db.Items.find({name: /m/})

    $scope.items = [
        {
            "Name": "Pen",
            "Quantity": 12,
            "Giver": "Peter Leung",
            "Taker": "Jack",
            "cat": "pen",
            "neighbourhood": "CUHK",
            "desc": "This is a pen",
            "Hashtag": "Pen"
        },
        {
            "Name": "CD",
            "Quantity": 2,
            "Giver": "Jack",
            "Taker": "Peter Leung",
            "cat": "pen",
            "neighbourhood": "CUHK",
            "desc": "This is a CD",
            "Hashtag": "CD"


        },
        {
            "Name": "Box",
            "Quantity": 5,
            "Giver": "Vegeta",
            "Taker": "Peter Leung",
            "cat": "pen",
            "neighbourhood": "CUHK",
            "desc": "This is a box",
            "Hashtag": "box"

        }

    ];
    $scope.usersTable = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: $scope.items.length,
        getData: function ($defer, params) {
            $scope.data = params.sorting() ? $filter('orderBy')($scope.items, params.orderBy()) : $scope.items;
            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.data);
        }
    });
});

app.controller('tableTwoController', function ($scope, $filter, ngTableParams) {
    //db.Items.find({name: /m/})

    $scope.items = [
        {
            "name": "Pen",
            "quantity": 12,
            "giver": "Peter Leung",
            "status": "Accepted",
            "clickTime": "Thu March 31 2016 18:30:00"
        },
        {

            "name": "CD",
            "quantity": 2,
            "giver": "Jack",
            "status": "Rejected",
            "clickTime": "Fri Apr 1 2016 06:26:07"
        },
        {

            "name": "Box",
            "quantity": 5,
            "giver": "Vegeta",
            "status": "Processing",
            "clickTime": "Tue Apr 5 2016 18:04:10"
        },
        {

            "name": "DB",
            "quantity": 7,
            "giver": "Goku",
            "status": "Rejected",
            "clickTime": "Mon Apr 11 2016 12:54:01"
        },
        {

            "name": "USB",
            "quantity": 1,
            "giver": "SHAW",
            "status": "Processing",
            "clickTime": "Tue Apr 12 2016 21:45:10"
        }
    ];
    $scope.usersTable = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: $scope.items.length,
        getData: function ($defer, params) {
            $scope.data = params.sorting() ? $filter('orderBy')($scope.items, params.orderBy()) : $scope.items;
            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.data);
        }
    });
});

app.controller('profileCtrl', function ($scope, mvAuth, mvIdentity) {
    $scope.pf_username = mvIdentity.currentUser.userName;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;
    $scope.update = function() {
        var newUserInfo = {
            userName: $scope.pf_username,
            firstName: $scope.fname,
            lastName: $scope.lname,
            password: $scope.pf_password
        }
    };
    mvAuth.updateCurrentUser(newUserInfo);
});