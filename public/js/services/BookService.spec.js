describe('BookService factory', function () {
    var Book;

    // Before each test load our module
    beforeEach(function(){
        angular.mock.module('BookService');
    });

    // Before each test set our injected Book factory (_Book_) to our local Book variable
    beforeEach(inject(function (_Book_) {
        Book = _Book_;
    }));

    // A simple test to verify the Book factory exists
    it('should exist', function () {
        expect(Book).toBeDefined();
    });
});