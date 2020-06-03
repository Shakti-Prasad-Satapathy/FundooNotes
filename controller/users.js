const async = require("async")
const userService = require("../services/user")
const { validationResult } = require('express-validator');


class UsersController {
  /********************REGISTER ******************** */
  // Description:This function will call the registeretion() by passing req and userData as param
  /***************************************************** */
  register = (req, res) => {

    let response = {
      'message': 'Something bad happend',
      'success': false
    };
    let message = ""
    try {
      const today = new Date();

      if (typeof req.body.name === 'undefined') {
        message = "name is mendetory"
        console.log(message);
        throw new Error('undefined name')

      }
      if (typeof req.body.email === 'undefined') {
        message = "email is mendetory"
        console.log('undefined email');
        throw new Error('undefined email')

      }
      if (typeof req.body.password === 'undefined') {
        message = "password is mendetory"
        console.log('undefined password');
        throw new Error('undefined password')

      }

      const errors = validationResult(req)
      // if (!errors.isEmpty()) {
      //   return res.status(422).json({ errors: errors.array() })
      // }
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created_at: today,
        updated_at: today,

      }



      // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      // var mail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

      if (!errors.isEmpty()) {
        // console.log("regex working");
        const headers = req.body.headers
        const email = req.body.email

        userService.registeretion(headers, email, userData) //calling registration service
          .then(() => {
            console.log("congrats You Are Successsfully registered");
            response.message = 'Successfully registered';
            response.success = true;
            res.status(200).send(response);

          }).catch(err => {
            response.message = 'registration failed. Enter the correct credentials';
            console.error(response.message + err)
            res.status(400).send(response);
          })
      }
      else {
        res.send('Sorry Registration failed please Enter a valid password or email')
        console.log("Sorry Registration failed please Enter a valid password or email");
        response.message = "Prease Enter valid Credentials"
        res.status(400).send(response);
      }
    }

    catch (error) {
      if (message != "") {
        response.message = message
      }
      console.log(response.message + error);
      res.send(response);
    }
  }


  /************************************LOGIN ************************************ */
  // Description:This function will call the userlogin() by passing req as param
  /***************************************************** */
  login = (req, res) => {
    let response = {
      'message': 'Something bad happend',
      'success': false
    };
    try {
      if (typeof req.body.email === 'undefined') {
        console.log('undefined email');
        throw new Error('undefined email')

      }
      if (typeof req.body.password === 'undefined') {
        console.log('undefined password');
        throw new Error('undefined password')

      }
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const email = req.body.email
        const password = req.body.password
        console.log(email, "******************", password);
        userService.userlogin(email, password)  //calling login service
          .then(result => {
            console.log("congrats You Are Successsfully loggedin",result);
            response.message = 'Successfully Logged In';
            response.success = true;
            response.data = {
              'token': result[0],
              "email": result[1]
            }
            res.status(200).send(response);
          }).catch(err => {
            response.message = 'Login failed. Enter the correct credentials';
            console.error(response.message + err)
            res.status(400).send(response);
          })
      }
      else{
        console.log("You have Entered wrong credentials please try again");
        response.message = "Please Enter Valid Credentials and try again"
        res.status(400).send(response);
      }
    }
    catch (error) {
      console.log(response.message + error);
      res.send(response);
    }
  }
  /*************************PROFILE ************************** */
  // profile = (req, res) => {
  //   var decoded = jwt.varify(req.headers['authorization'], process.env.SECRET_KEY)
  //   var findone = User.findemail(req)
  //   User.findUser(findone,res)
  // }

  /************************* FORGOT PASSWORD ************************** */
  // Description:This function will call the recoverPassword() by passing req and async as param
  /***************************************************** */


  forgotPassword = (req, res) => {
    let response = {
      'message': 'Something bad happend',
      'success': false
    };

    try {


      const email = req.body.email
      const headers = req.body.headers //"http//:localhost:4000" //req.headers.host

      if (typeof req.body.email === 'undefined') {
        console.log('undefined email');
        throw new Error('undefined email')

      }

      userService.recoverPassword(email, async, headers)   //calling registration service 
        .then(() => {

          console.log("congrats You Are Successsfully reset password  link sent via gmail");
          response.message = 'Successfully Sent';
          response.success = true;
          res.status(200).send(response);

        })
        .catch(err => {
          response.message = 'reseting password failed Enter the correct credentials';
          console.error(response.message + err)
          res.status(400).send(response)
        })
    }

    catch (error) {
      console.log(response.message + error);
      res.send(response);
    }

  }
}
module.exports = new UsersController();
