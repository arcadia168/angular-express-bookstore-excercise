process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('/GET /api/books', () => {
    it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(15);
                done();
            });
    });

    it('it should GET a sepcific book by OLID', (done) => {
        chai.request(server)
            .get('/api/olid/books/OL24364628M')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.key.should.have.string('OL24364628M');
                done();
            });
    });

    it('it should GET a sepcific book by title', (done) => {
        chai.request(server)
            .get('/api/title/books/Great%20expectations')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.title.should.have.string('Great expectations');
                done();
            });
    });
});