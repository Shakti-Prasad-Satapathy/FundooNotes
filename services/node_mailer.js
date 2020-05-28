const nodemailer = require("nodemailer");
// var statuszz = "false"

module.exports.mailer = (token, useremail, headers, flag) => {
  console.log(useremail,"**********************==xxxx==***********************",headers);

  var statuszz = "aaa"
  var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    
    auth: {
      // user:  process.env.EMAIL,
      // pass:  process.env.PASSWORD
      user: "shaktiprasadsatapathy96@gmail.com", 
      pass: "wtqrcbgihcvqibgo"
    }
  });
  // let x = {user: process.env.EMAIL}
  // console.log("////////////////////////",smtpTransport.auth.user,"===============*****************==============",process.env.PASSWORD);
  
  if (flag == "forgotpassword") {
    console.log("-----------------------------------forgotpassword");
    var mailOptions = {
      to: 'bjhtwuuhxkvscdiraa@awdrt.com',
      from: 'shaktiprasadsatapathy96@gmail.com',
      subject: 'Password Reset',
      text: 'You are receiving this because you  have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + headers + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
  }
  else  if (flag == "verifyuser") { 
    console.log("-----------------------------------verifyuser");
    
    var mailOptions = {
      to: useremail,
      from: 'shaktiprasadsatapathy96@gmail.com',
      subject: 'Registration Authentication',
      text: 'You are receiving this because you  have currently register with our app.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process of varryfing user:\n\n' +
        'http://' + headers + '/index/' + token + '\n\n' +
        'If you did not request this, please ignore this email....\n'
    };

  }

  smtpTransport.sendMail(mailOptions, function (err) {
      console.log("----------------Mail sending");
    if (err) {
      console.log("some error in nodemailer.js",err);
      return err
    }
    else {
      statuszz = "bbb"
      console.log('mail sent');
      req.flash('success', 'An e-mail has been sent to ' + useremail + ' with further instructions.');
      return statuszz

    }
  });
  // console.log("----------------", statuszz);


}


