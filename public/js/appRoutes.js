//public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // books page that will use the BookController
        .when('/books', {
            templateUrl: 'views/book.html',
            controller: 'BookController'
        });

    $locationProvider.html5Mode(true);

}]);