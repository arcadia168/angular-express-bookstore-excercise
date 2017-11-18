// app/models/book.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our book model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Book', {
    name : {type : String, default: ''}
});