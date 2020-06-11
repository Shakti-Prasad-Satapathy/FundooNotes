const Sequelize = require("sequelize")
const db = require("../database/db.js")


// Schema of Users table
module.exports.userModel = db.sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncriment: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    logintoken: {
      type: Sequelize.STRING
    }


  },
  {
    timestamps: false
  }

)

/***************************************************** */
// Description:This function calling from users services. This contains findOne() of sequelize
// to find the exact email based on user input
/***************************************************** */
module.exports.findEmail = (email) => {
  return this.userModel.findOne({//findOne method of sequelize package
    where: {
      email: email//checking if the email address sent by client is present in the db(valid)
    }
  })
}


/***************************************************** */
// Description:This function calling from users services. This contains findOne() of sequelize
// to find the user basedon login token which is generated during user login 
/***************************************************** */

module.exports.finduser = (logintoken) => {
  return new Promise((resolve, reject) => {
    this.userModel.findOne({//findOne method of sequelize package
      where: {
        logintoken: logintoken//checking if the email address sent by client is present in the db(valid)
      }
    })
      .then((data) => {
        resolve(data.dataValues.id)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/***************************************************** */
// Description:This function calling from users services. This contains update() of sequelize
// to update the resetPasswordToken in users table after generating  the resetpassword tokken
/***************************************************** */

module.exports.updateUsers = (token, email) => {
  //update method of sequelize package
  return this.userModel.update({ resetPasswordToken: token, resetPasswordExpires: Date() }, { where: { email: email } })
}

/***************************************************** */
// Description:This function calling from users services. This contains update() of sequelize
// to update the login token in users table which is generated after a user logging in
/***************************************************** */

module.exports.logintoken = (logintoken, email) => {
  //update method of sequelize package
  return this.userModel.update({ logintoken: logintoken }, { where: { email: email } })
}


/***************************************************** */
// Description:This function calling from users services. This contains create() of sequelize
// to add the users registration details in users table on create user
/***************************************************** */

module.exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    this.userModel.create(userData) //create method of sequelize package
      .then(user => {
        resolve(user)
      })
      .catch(err => {
        reject(err)
      })
  })
}
