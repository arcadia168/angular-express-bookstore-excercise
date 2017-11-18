// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['BookService']).controller('MainController', function ($scope, Book) {

    $scope.tagline = 'To the moon and back!';

    Book.all().then(function (books) {
        //console.log(JSON.stringify(books));
        console.log(books);
        $scope.books = books.data;
    });

    $scope.searchForBook = function (searchTerm) {

        console.log("Searching for book: " + searchTerm);
        //search term can be a title or an OLID

        //ASSUMPTION: valid OLID if starts with 'OL', and ends with 'M', with onlsy numbers in between
        //REGEX FOR THIS: /^OL\d+M\s/
        var regexp = /^OL\d+M$/;
        let m;
        let isValidOlid = false;

        //first check title is an OLID
        if ((m = searchTerm.match(regexp)) !== null) {
            isValidOlid = true;
        }

        //Send seach term to server for specific book.

        if (isValidOlid) {
            //query passing in olid

        } else {
            //query using title

        }
    };
});