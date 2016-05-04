/*require('../config/mongoose_conf.js')();
var itemsSchema = mongoose.Schema({
        pic: Buffer,
        giver: String,
        taker: String,
        clickTime: Date,
        trending: Boolean,
        newListing: Boolean,
        name: String,
        cat: String,
        neighbourhood: String,
        quantity: Number,
        desc: String,
        getTime: Date,
        status: Number
    },
    {
        autoIndex: true,
        timestamps: {createdAt: 'created_at'}
    });

var Items = mongoose.model('Items', itemsSchema);
Items.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
        Items.create({
            pic: '',
            giver: 'joeBloggs',
            taker: 'billLiu',
            clickTime: ISODate("2016-03-28T01:00:00+01:00"),
            trending: true,
            newListing: true,
            name: 'A lump of metal',
            cat: 'book1',
            neighbourhood: 'psk',
            quantity: 15,
            desc: 'no description',
            getTime: ISODate("2016-04-01"),
            status: 0
        });
    }
});

Items.find({}).exec(function (err, document) {
    if (!err) {

        console.log(document);
    }
});*/

var app = angular.module('ngTableTutorial', ['ngTable']);
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
            "Hashtag":"Pen"
        },
        {
            "Name": "CD",
            "Quantity": 2,
            "Giver": "Jack",
            "Taker": "Peter Leung",
            "cat": "pen",
            "neighbourhood": "CUHK",
            "desc": "This is a CD",
            "Hashtag":"CD"


        },
        {
            "Name": "Box",
            "Quantity": 5,
            "Giver": "Vegeta",
            "Taker": "Peter Leung",
            "cat": "pen",
            "neighbourhood": "CUHK",
            "desc": "This is a box",
            "Hashtag":"box"

        }

    ];
    $scope.usersTable = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: $scope.items.length,
        getData: function ($defer, params) {
            $scope.data = params.sorting() ? $filter('orderBy')($scope.items , params.orderBy()) : $scope.bookedItem;
            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
            $scope.data = $scope.data .slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.data);
        }
    });
});


