const Sequelize = require("sequelize")
const Op = Sequelize.Op;
const noteModel = require("../models/note")
const userModel = require("../models/user")


/*********************************************************** */
// This class contains 2 functions ie. findAllUser and createCollaborator where search will 
// search the user by email req, to whom we want to collab and createCollaborator will
// add the collab users id to the note table
/*****************************************************************/

class Collaborator {

    /* ***************************************************** */
    // Description:This function calling from collab services. This contains findAll() 
    // of sequelize to find all exact user based on user input by passing req as param
    /***************************************************** */

    findAllUser = (email) => {
        return new Promise((resolve, reject) => {

            userModel.userModel.findOne({ // findAll() of sequelize to find email is present in db or not
                where: {
                    email: email
                    // email: {
                    //     [Op.like]: '%' + email + '%'    //regex to find all email containing the charactor(s) entered by the user
                    // }
                    // email: { $regex: new RegExp('^'+'[' + escape(req.body.email) +']'+'[a-zA-Z0-9]' + '$','i') }
                }
            })
                .then((data) => {
                    resolve(data.id)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /* ***************************************************** */
    // Description:This function calling from collab services. This contains findAll() 
    // of sequelize to find all exact user id based on user input by passing req as param
    /***************************************************** */
    finduserid = (userid) => {
        return noteModel.noteModel.findAll({ // findAll() of sequelize to find all matches
            where: {
                userid: userid //checking if the userid sent by client is present in the db(valid)
            }
        })
    }

    /* ***************************************************** */
    // Description:This function calling from collab services. This contains findAll() 
    // of sequelize to find all exact note id based on user input by passing req as param
    /***************************************************** */
    findnoteid = (noteid) => {
        return noteModel.noteModel.findAll({ // findAll() of sequelize to find all matches
            where: {
                noteid: noteid //checking if the userid sent by client is present in the db(valid)
            }
        })
    }

    /* ***************************************************** */
    // Description:This function calling from collab services. This contains update() 
    // of sequelize to update tje collab field of notes table based on user input by passing req as param
    /***************************************************** */


    createCollaborator = (userid, noteid) => {
        return new Promise((resolve, reject) => {

            noteModel.noteModel.update({ colabuser: userid }, { where: { noteid: noteid } })//create method of sequelize package
                .then(() => {                    
                    resolve("success......fl")
                })
                .catch(err => {
                    reject("Error in create collaborator", err)
                })
       
        })
    }
}

module.exports = new Collaborator()