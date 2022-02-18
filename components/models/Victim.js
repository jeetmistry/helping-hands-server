const mongoose = require('mongoose');

// const victim = {
//     "location": String,
//     "timestamp": time, --
//     "status": "active"/"close",
//     "disasterAddress": String,
//     "pincode": Number,
//     "disasterType": String,
//     "photos": NOIDEA,
//     "helpNeeded": String,
//     "victimInfo": {
//       "name": String,
//       "self": boolean,
//       "contactNo": Number,
//       "email": Email,
//       "AADHAR": Number
//     },
//     "additionalInfo": String
//   }

  const victimSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    disasterAddress:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    AADHAR:{
        type:String,
        required:true
    },
    disasterType:{
        type:String,
        required:true
    },
    helpNeeded:{
        food:{
            type:Number,
            required:true
        },
        clothes:{
            type:Number,
            required:true
        },
        transport:{
            type:Number,
            required:true
        },
        medical:{
            type:Number,
            required:true
        }
    },
    photo:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    additionalInfo:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    helpCount:{
        type:Number,
        required:true
    }
  },
  { versionKey: false })

  const Victim = mongoose.model('Victim',victimSchema);

module.exports = Victim;