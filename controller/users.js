const async = require("async")
const userService = require("../services/user")
const { validationResult } = require('express-validator');
const logger = require("../config/logger")


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
      const today = new Date(); // getting current date
      // checking user inputed name is perfect or not
      if (typeof req.body.name === 'undefined') {
        message = "name is mendetory"
        logger.warn(message);
        throw new Error('undefined name')
      }
      //checking user inputed email is perfect or not
      if (typeof req.body.email === 'undefined') {
        message = "email is mendetory"
        logger.warn('undefined email');
        throw new Error('undefined email')
      }
      // checking user inputed password is perfect or not
      if (typeof req.body.password === 'undefined') {
        message = "password is mendetory"
        logger.warn('undefined password');
        throw new Error('undefined password')
      }

      const errors = validationResult(req)

      const userData = {
        name: req.body.name,  // getting user name for registration
        email: req.body.email,  // getting user email for registration
        password: req.body.password,  // getting user password for registration
        created_at: today,  // getting currante date for set registration date
        updated_at: today,  // getting currante date for set updating user details date

      }
      // validating that field should not be empty
      if (!errors.isEmpty()) {
        // console.log("regex working");
        const headers = req.body.headers  // sending the header by req.
        const email = req.body.email  // getting email address from the user for registration

        userService.registeretion(headers, email, userData) //calling registration service
          .then(() => {
            logger.info("congrats You Are Successsfully registered");
            response.message = 'Successfully registered';
            response.success = true;
            res.status(200).send(response);

          }).catch(err => {
            response.message = 'registration failed. Enter the correct credentials';
            logger.error(response.message + err)
            res.status(400).send(response);
          })
      }
      else {
        res.send('Sorry Registration failed please Enter a valid password or email')
        logger.error("Sorry Registration failed please Enter a valid password or email");
        response.message = "Prease Enter valid Credentials"
        res.status(400).send(response);
      }
    }

    catch (error) {
      if (message != "") {
        response.message = message
      }
      logger.error(response.message + error);
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
      // checking whethere the inputed email is perfect or not
      if (typeof req.body.email === 'undefined') {
        logger.warn('undefined email');
        throw new Error('undefined email')

      }
      // checking whether the user input is  perfect password or not
      if (typeof req.body.password === 'undefined') {
        logger.warn('undefined password');
        throw new Error('undefined password')
      }
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const email = req.body.email  // getting email id to compire it with resistered user email for authenticate
        const password = req.body.password  // getting password to compire it with resistered user password for authenticate
        userService.userlogin(email, password)  //calling login service
          .then(result => {
            logger.info("congrats You Are Successsfully loggedin", result);
            response.message = 'Successfully Logged In';
            response.success = true;
            response.data = {
              'token': result[0],
              "email": result[1]
            }
            res.status(200).send(response);
          }).catch(err => {
            response.message = 'Login failed. Enter the correct credentials';
            logger.error(response.message + err)
            res.status(400).send(response);
          })
      }
      else {
        logger.error("You have Entered wrong credentials please try again");
        response.message = "Please Enter Valid Credentials and try again"
        res.status(400).send(response);
      }
    }
    catch (error) {
      logger.error(response.message + error);
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
      const email = req.body.email  // getting the users email id to authenticate the requesting user
      const headers = req.body.headers //"http//:localhost:4000" //req.headers.host
      // checking the user inputed email address is  perfect or not
      if (typeof req.body.email === 'undefined') {
        logger.warn('undefined email');
        throw new Error('undefined email')
      }
      userService.recoverPassword(email, async, headers)   //calling registration service 
        .then(() => {
          logger.info("congrats You Are Successsfully reset password  link sent via gmail");
          response.message = 'Successfully Sent';
          response.success = true;
          res.status(200).send(response);

        })
        .catch(err => {
          response.message = 'reseting password failed Enter the correct credentials';
          logger.error(response.message + err)
          res.status(400).send(response)
        })
    }

    catch (error) {
      logger.error(response.message + error);
      res.send(response);
    }

  }
}
module.exports = new UsersController();
