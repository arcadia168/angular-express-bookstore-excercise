// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['BookService']).controller('MainController', function ($scope, Book) {

    $scope.searchActive = false;

    Book.all().then(function (books) {
        console.log(books);
        $scope.books = books.data;
        $scope.searchResults = books.data;
    });

    $scope.searchForBook = function (searchTerm) {

        //search term can be a title or an OLID

        //ASSUMPTION: valid OLID if starts with 'OL', and ends with 'M', with onlsy numbers in between
        //REGEX FOR THIS: /^OL\d+M\s/
        var regexp = /^OL\d+M$/;
        let matches;
        let isValidOlid = false;

        //first check title is an OLID
        if ((matches = searchTerm.match(regexp)) !== null) {
            isValidOlid = true;
        }

        //Send seach term to server for specific book.

        if (isValidOlid) {
            //query passing in olid
            Book.getByOlid(searchTerm).then(function(searchResult){
                $scope.searchActive = true                
                $scope.searchResults = [];
                $scope.searchResults.push(searchResult.data);
            })
        } else {
            //query using title
            Book.getByTitle(searchTerm).then(function(searchResult){
                $scope.searchActive = true;                
                $scope.searchResults = [];
                $scope.searchResults.push(searchResult.data);
            })
        }
    };

    $scope.clearSearch = function () {
        $scope.searchActive = false;
        $scope.searchResults = $scope.books;
        $scope.searchTerm = '';
    }
});