const Collab = require("../models/Collaborator")
const User = require("../models/user")

/*********************************************************** */
// This class contains 2 services ie. search and createCollaborator where search will 
// search the user, to whom we want to collab and createCollaborator will add the 
// collab users id to the note table
/******************************************************************** */

class UserServices {

    /********************search ******************** */
    // Description: This function will call the findAllUser() of collab model by sending
    // req and User as param. for searching the inputed user. then using promises, resolve
    // if any data found
    /************************************************ */

    search(email) {
        return new Promise((resolve, reject) => {
            Collab.findAllUser(email)   //calling findAllUser() of collab model to search requested email
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject('email not found: ' + err)
                })
        })
    }

    /********************search ******************** */
    // Description: This function will call the createCollaborator() of collab model by
    // sending req as param. for update the collab field of notes table, and return the 
    // result to the controller if any data found
    /************************************************ */

    createCollaborator(userid, noteid) {        
        return Collab.createCollaborator(userid, noteid)    //calling createCollaborator()of collab model to add the requested email for collaboretion
    }
}

module.exports = new UserServices()