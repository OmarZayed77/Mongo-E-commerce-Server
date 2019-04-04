const mongoose = require('../DBL/mongoose');
const Schema = mongoose.Schema;


const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

module.exports =  mongoose.model("Category", categorySchema);