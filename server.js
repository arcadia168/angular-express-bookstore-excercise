// server.js

// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var http = require('http');
var Book = require('./app/models/book');
var _ = require('underscore');

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app); // configure our routes

//query 2nd party api for books
var options = {
    //protocol: 'https',
    host: 'openlibrary.org',
    path: '/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&amp;jscmd=data&amp;format=json'
}

var req = http.get(options, function (res) {
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function (chunk) {
        bodyChunks.push(chunk);
    }).on('end', function () {
        var books = Buffer.concat(bodyChunks);
        var booksToStore = JSON.parse(books);

        //Update the store of books in the collection.
        mongoose.connection.db.dropCollection('books', function (err, result) {
            //iterate over the API results and upsert those in the MongoDB
            for (var rawBookKey in booksToStore) {
                //console.log('iterating property' +  rawBookKey);
                if (booksToStore.hasOwnProperty(rawBookKey)) {
                    //Parse object into Book document
                    var currentBook = new Book(booksToStore[rawBookKey]);

                    currentBook.save(function (err) {
                        if (err) throw err;
                    });
                }
            }
        });
    })
});

req.on('error', function (e) {
    res.send(e);
})

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;