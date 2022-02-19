const Admin = require('../models/Admin')
const Victim = require('../models/Victim')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'helping.hands.relief.movement@gmail.com',
      pass: 'helpinghands@1234'
    }
  });


exports.registerAdmin = async (req, res) => {
    try {
        const admin = {
            name:req.body.name,
            emial:req.body.email,
            password:req.body.password
        }
        const newAdmin = new Admin(admin)
        await newAdmin.save()
        res.json(newAdmin)
    } catch (err) {
        console.error(err)
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const data = await Admin.findOne({ email: req.body.email });
        if (data) {
            if (data.password === req.body.password) {
                context = {"message": "Login Success"};
                res.json(context);
            } else {
                context = {"message": "Incorrect Password"};
                res.json(context);
            }
        } else {
            context = {"message": "Admin Not found"};
            res.json(context);
        }
    } catch (err) {
        console.error(err)
    }
}


exports.activeRequest = async (req, res) => {
    try {
        const victims = await Victim.find({status: "active"});
        res.json(victims)
    } catch (err) {
        console.error(err)
    }
}

exports.closedRequest = async (req, res) => {
    try {
        const victims = await Victim.find({status: "closed"});
        res.json(victims)
    } catch (err) {
        console.error(err)
    }
}

exports.updateReq = async (req, res) => {
    try {
        const updatedVictim = await Victim.findByIdAndUpdate(req.params.id, {status: "progress"});

        //sending mail to the victim for progress
        const mailOptions = {
            from: 'helping.hands.relief.movement@gmail.com',
            to: updatedVictim.email,
            subject: `Request for ${updatedVictim.disasterType} relief`,
            html: `<h1>Request for ${updatedVictim.disasterType} relief has been viewed<h1><h3> ${updatedVictim.name} your request it has sent to another step successfully to take action as soon as possible please do not panic.</h3>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        // res.json(updatedVictim)
        context = {"message": "Updated Successfully"};
        res.json(context);
    } catch (err) {
        console.error(err)
    }
}

