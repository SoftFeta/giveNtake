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