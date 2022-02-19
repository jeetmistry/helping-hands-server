const Authority = require('../models/Authority')
const Victim = require('../models/Victim')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'helping.hands.relief.movement@gmail.com',
      pass: 'helpinghands@1234'
    }
  });

var category;
exports.registerAuthority = async (req, res) => {
    try {
        const authority = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            helpProvide:req.body.helpProvide,
            address:req.body.address,
            pincode:req.body.pincode,
            contactNo:req.body.contactNo,
            additionalInfo:req.body.additionalInfo
        }
        const newAuth = new Authority(authority)
        await newAuth.save();

        const mailOptions = {
            from: 'helping.hands.relief.movement@gmail.com',
            to: authority.email,
            subject: `Registration for ${authority.helpProvide} successful`,
            html: `<h1>Hello ${authority.name}, Your Registration for ${authority.helpProvide} was successfull, kindly login for further actions.</h1>`
          };

          //sending mail to the authority once registered
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          context = {"message": "Registration Successful"};
          res.json(context);

    } catch (err) {
        context = {"message": "Registration Failed"};
        console.log(err);
        res.json(context);
    }
}

exports.loginAuthority = async (req, res) => {
    try {
        const data = await Authority.findOne({ email: req.body.email });
        if (data) {
            if (data.password === req.body.password) {
                context = {"message": "Login Success"};
                category = data.helpProvide;
                res.json(context);
            } else {
                context = {"message": "Incorrect Password"};
                res.json(context);
            }
        } else {
            context = {"message": "Authority Not found"};
            res.json(context);
        }
    } catch (err) {
        console.error(err)
    }
}


exports.progressRequest = async (req, res) => {
    try {
        console.log("-------------", category);
        victims = "";
        if(category == "food"){
            victims = await Victim.find({status: "progress", "helpNeeded.food": 1});
        }else if(category == "transport"){
            victims = await Victim.find({status: "progress", "helpNeeded.transport": 1});
        }else if(category == "clothes"){
            victims = await Victim.find({status: "progress", "helpNeeded.clothes": 1});
        }else if(category == "medical"){
            victims = await Victim.find({status: "progress", "helpNeeded.medical": 1});
        }
            
        res.json(victims)
    } catch (err) {
        console.error(err)
    }
}

exports.closedRequest = async (req, res) => {
    try {
        
        victims = "";
        if(category == "food"){
            victims = await Victim.find({status: "closed", "helpNeeded.food": 2});
        }else if(category == "transport"){
            victims = await Victim.find({status: "closed", "helpNeeded.transport": 2});
        }else if(category == "clothes"){
            victims = await Victim.find({status: "closed", "helpNeeded.clothes": 2});
        }else if(category == "medical"){
            victims = await Victim.find({status: "closed", "helpNeeded.medical": 2});
        }
            
        res.json(victims)
    } catch (err) {
        console.error(err)
    }
}

exports.updateReq = async (req, res) => {
    try {
        // const updatedVictim = await Victim.findByIdAndUpdate(req.params.id);
        let victim = await Victim.findOne({"_id": req.params.id});
        cnt = victim.helpCount - 1;

        if(category == "food"){
            victims = await Victim.findByIdAndUpdate(req.params.id, {helpCount: cnt, "helpNeeded.food": 2});
        }else if(category == "transport"){
            victims = await Victim.findByIdAndUpdate(req.params.id, {helpCount: cnt, "helpNeeded.transport": 2})
        }else if(category == "clothes"){
            victims = await Victim.findByIdAndUpdate(req.params.id, {helpCount: cnt, "helpNeeded.clothes": 2})
        }else if(category == "medical"){
            victims = await Victim.findByIdAndUpdate(req.params.id, {helpCount: cnt, "helpNeeded.medical": 2})
        }

        if(cnt == 0){
            victims = await Victim.findByIdAndUpdate(req.params.id, {status: "closed"});

            //sending mail to the victim
        const mailOptions = {
            from: 'helping.hands.relief.movement@gmail.com',
            to: victims.email,
            subject: `Help for ${victims.disasterType} relief is coming`,
            html: `<h1>Request for ${victims.disasterType} relief has been approved successfully.</h1> <h3> Dear ${victims.name} please do not panic our team is on the way to help you in this tough times. Please be hopeful.</h2>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
        // res.json(updatedVictim)
        context = {"message": "Updated Successfully"};
        res.json(context);
    } catch (err) {
        console.error(err)
    }
}

