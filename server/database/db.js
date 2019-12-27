const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/all4one', { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose.connection;
}