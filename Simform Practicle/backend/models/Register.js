const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   },
   token: {
      type: String
   },
   password: {
      type: String
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('Register', User)