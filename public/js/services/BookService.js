// public/js/services/BookService.js
angular.module('BookService', []).factory('Book', ['$http', function ($http) {

    return {
        // call to get all Books
        all: function () {
            return $http.get('/api/books');
        },

        getByOlid: function(book_id) {
            return $http.get('/api/olid/books/' + book_id);
        },

        getByTitle: function(book_title) {
            return $http.get('/api/title/books/' + book_title);
        },
    }
}]);