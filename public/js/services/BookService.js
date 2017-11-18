// public/js/services/BookService.js
angular.module('BookService', []).factory('Book', ['$http', function ($http) {

    return {
        // call to get all Books
        all: function () {
            return $http.get('/api/books');
        },

        get: function(book_id) {
            console.log('QUERYING: ' + '/api' + book_id);
            return $http.get('/api' + book_id);
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new book
        create: function (bookData) {
            return $http.post('/api/books', bookData);
        },

        // call to DELETE a book
        delete: function (id) {
            return $http.delete('/api/books/' + id);
        }
    }

}]);