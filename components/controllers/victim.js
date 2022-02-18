const Victim = require('../models/Victim')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'helping.hands.relief.movement@gmail.com',
      pass: 'helpinghands@1234'
    }
  });

exports.addVictim = async (req, res) => {
    try {
        const data = req.body;
        const modifiedData = {
            name:data.name,
            email:data.email,
            contactNo:data.contactNo,
            disasterAddress:data.disasterAddress,
            location:data.location,
            AADHAR:data.aadhar,
            disasterType:data.disasterType,
            photo:data.photo,
            pincode:data.pincode,
            additionalInfo:data.additionalInfo,
            status:"active",
            helpNeeded: {
                food: 0,
                transport: 0,
                clothes:0,
                medical:0
            },
            helpCount: 0
        }
        cnt = 0;
        if(data.food==="food"){
            modifiedData.helpNeeded.food=1
            cnt+=1;
        }
        if(data.transport==="transport"){
            modifiedData.helpNeeded.transport=1
            cnt+=1;
        }
        if(data.clothes==="clothes"){
            modifiedData.helpNeeded.clothes=1
            cnt+=1;
        }
        if(data.medicalKit==="medicalKit"){
            modifiedData.helpNeeded.medical=1
            cnt+=1;
        }
        modifiedData.helpCount = cnt;

        const newVictim = new Victim(modifiedData);
        await newVictim.save();
        context = {"message": "request added successfully"}

        //sending mail to the victim
        const mailOptions = {
            from: 'helping.hands.relief.movement@gmail.com',
            to: modifiedData.email,
            subject: `Request for ${modifiedData.disasterType} relief`,
            html: `<h1>Request for ${modifiedData.disasterType} relief has been submitted successfully.</h1> <h3> Dear ${modifiedData.name} please do not panic we will try out best to help you out.</h2>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        //response to the frontend
        res.json(context);
    } catch (err) {
        console.error(err)
    }
}
