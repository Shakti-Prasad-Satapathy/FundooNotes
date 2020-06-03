// const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const randomBytes = require('randombytes');
const mailer = require("../services/node_mailer")
const jwstoken = require("../auth/auth")

const User = require("../models/user")
process.env.SECRET_KEY = "secret"


/**************************************************************** */
// This class contains login , registration and forgot/recover passwordcontrollers
/**************************************************************** */

class UserServices {

  /************************************************************ */
  //
  // Description:This function calling from users controller, and calling findEmail() of 
  // model/user.js by passing req param. then using promise creating an encripted
  // password and then calling createUser() of model/user.js by passing userdata as 
  // argument, then resolve and reject the result
  //
  /***************************************************** */


  registeretion(headers, email, userData) {
    return new Promise((resolve, reject) => {

      var flag = "verifyuser"
      User.findEmail(email)  //to check entered email address is alredy registered or new
        .then(user => {

          if (user == null) {
            const hash = bcrypt.hashSync(userData.password, 10)// Hashing in password
            userData.password = hash

            User.createUser(userData)// function to create new user
              .then(data => {

                if (data) {

                  let token = jwstoken.jsonToken(data.dataValues) // generating jwt
                  mailer.mailer(token, email, headers, flag)
                  resolve("Successfull......")

                }
                else {
                  reject("Sorry Unable to register")
                }
              })
              .catch(error => {
                reject(error)
              })
          } else {
            reject({ error: "USER ALREADY EXISTS" })  // responce if email already exist in database
          }
        })
        .catch(err => {
          reject(err)
        })
    })

  }

  /************************************************************ */
  //
  // Description:This function calling from users controller, and calling findEmail() of 
  // model/user.js by passing req param. then using promise creating an jwt and resolve it
  // for sending it as a responce
  //
  /***************************************************** */

  userlogin(email, password) {
    
    return new Promise((resolve, reject) => {
      User.findEmail(email) //to check whethere that email is registred or not
        .then(user => {
          console.log("kkkkkkkkkkk",user.dataValues.email);
          const usermail = user.dataValues.email
          if (bcrypt.compareSync(password, user.password)) {
            const x = {
              email: user.dataValues.email
            }
            var logintoken = (jwstoken.jsonToken(x))
                        
            User.logintoken(logintoken, email)
            .then(() => {
              resolve([logintoken, usermail])
            })
            .catch(error => {
              reject(error)
            })
            
          }
          else {
            reject({ error: "USER ALREADY EXISTS" })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /************************************************************ */
  //
  // Description:This function calling from controller, using async.waterfall mechanism
  // 1st generated token then calling and calling findEmail() of model/user.js by 
  // passing req param.if email found then update the token un users model then call 
  // the mailer service then a mail containing recoverry password link will be sent to
  // the requested e mail this process will watch under async.waterfall and promises
  //
  /***************************************************** */

  recoverPassword(email, async, headers) {

    return new Promise((resolve, reject) => {
      var flag = "forgotpassword"
      async.waterfall([
        function (done) {
          var random = randomBytes(32)
          var random = random.toString('hex')
          bcrypt.hash('random', 10, function (err, hash) {
            var token = hash
            done(err, token);
          });
        },

        function (token) {
          User.findEmail(email) //to check whethere that email is registred or not
          // console.log("[[[[[[[[[[[[[[[[[[[[[", User);
          
            .then(user => {

              if (user != null) {
                
                User.updateUsers(token, email)  // update users table with the token generated for password recover
                  .then(() => {
                    mailer.mailer(token, email, headers, flag)  // calling the mailler service to send the reset password link via email
                  }).catch(err => {
                    console.log(err);
                    reject(err)
                  })
              }
              else {
                reject("unable to update your new password")
              }
            }).catch(error => {
              console.log("Sorry Email not found", error);
              reject("Sorry Email not found", error)
            })

        },
      ], function (err) {
        if (err) {
          console.log("ERROR IN NODE MAILER", err);
        }
        // res.redirect('/forgot');
      });
    })

  };


}

module.exports = new UserServices()