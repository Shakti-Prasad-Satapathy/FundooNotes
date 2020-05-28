const jwt = require("jsonwebtoken")

module.exports.jsonToken = (dataValues) => {

    return token = jwt.sign(dataValues, process.env.SECRET_KEY, { expiresIn: 1440 })
    // res.json({ token: token, message: "you are successfully logged in", userid: dataValues.id })//generating and sending responce in jwt format after success of create
}