const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
   name: {
      type: String
   },
   category: {
      type: String
   },
   image: {
      data: Buffer, 
        contentType: String
   },
   price: {
      type: Number
   },
   discount: {
      type: Number
   },
   netprice: {
      type: Number
   },
   description: {
      type: String
   }
}, {
   collection: 'products'
})

module.exports = mongoose.model('Products', Product)