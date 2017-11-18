// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['BookService']).controller('MainController', function ($scope, Book) {

    $scope.tagline = 'To the moon and back!';

    Book.all().then(function (books){
        //console.log(JSON.stringify(books));
        console.log(books);
        $scope.books = books.data;

        $scope.firstBook = Book.get($scope.books[0].key).then(function(bookData) {
            console.log(JSON.stringify(bookData));
        })
    });
});