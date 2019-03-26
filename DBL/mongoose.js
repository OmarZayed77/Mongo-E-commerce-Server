const mongoose = require('mongoose');

const url = process.env.BASE_URL || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});

module.exports = mongoose;