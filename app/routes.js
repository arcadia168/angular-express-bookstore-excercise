 // app/routes.js

 // grab the book model we just created
 var Book = require('./models/book');
 var http = require('http');

 module.exports = function (app) {

     // server routes ===========================================================
     // handle things like api calls
     // authentication routes

     // sample api route
     app.get('/api/books', function (req, res) {
         // use mongoose to get all nerds in the database
         Book.find(function (err, books) {

             // if there is an error retrieving, send the error. 
             // nothing after res.send(err) will execute
             if (err)
                 res.send(err);

             res.json(books); // return all nerds in JSON format
         });
     });

     app.get('/api/olid/books/:book_id', function (req, res) {

        //get book id
        var book_id = '/books/' + req.params.book_id;

        console.log('QUERYING FOR OLID: ' + book_id);

        // use mongoose to get all nerds in the database
        Book.findOne({ key: book_id}, function (err, book) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(book); // return all nerds in JSON format
        });
    });

    app.get('/api/title/books/:title', function (req, res) {
        
                //get book id
                var title = req.params.title;
        
                console.log('QUERYING FOR TITLE: ' + title);
        
                // use mongoose to get all nerds in the database
                Book.findOne({ title: title}, function (err, book) {
        
                    // if there is an error retrieving, send the error. 
                    // nothing after res.send(err) will execute
                    if (err)
                        res.send(err);
        
                    res.json(book); // return all nerds in JSON format
                });
            });

     // route to handle creating goes here (app.post)
     // route to handle delete goes here (app.delete)

     // frontend routes =========================================================
     // route to handle all angular requests
     app.get('*', function (req, res) {
         res.sendfile('./public/views/index.html'); // load our public/index.html file
     });

 };