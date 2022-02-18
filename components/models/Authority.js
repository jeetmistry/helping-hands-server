const mongoose = require('mongoose')
// const Authority = {
//     "name": String,
//     "address":String,
//     "pincode": Number,
//     "contactNo": Number,
//     "email": Email,
//     "AADHAR": Number,
//     "helpProvide": [
//       "Food&Water",
//       "Cloths",
//       "Transport",
//       "Medical Kits"
//     ],
//     "additionalInfo": String
//   }
const authoritySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
      type: String,
      required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    helpProvide: {
      type: String,
      required: true
    },
    additionalInfo: {
      type: String,
    },
}, { versionKey: false })
const Athority = mongoose.model('Athority', authoritySchema)

module.exports = Athority
  