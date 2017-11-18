// public/js/services/BookService.js
angular.module('BookService', []).factory('Book', ['$http', function ($http) {

    return {
        // call to get all Books
        all: function () {
            return $http.get('/api/books');
        },

        getByOlid: function(book_id) {
            console.log('QUERYING BY OLID: ' + '/api' + book_id);
            return $http.get('/api/olid' + book_id);
        },

        getByTitle: function(book_title) {
            console.log('QUERYING BY TITLE: api/title/books/' + book_title);
            return $http.get('/api/title/' + book_title);
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