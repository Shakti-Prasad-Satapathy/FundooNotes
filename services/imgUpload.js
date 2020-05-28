const img = require("../models/imageUpload")
const User = require("../models/user")

/*********************************************************** */
// This class contains 2 controller ie. search and add collab where search will search the
// user, to whom we want to collab and createCollaborator will add the collab users id to 
//the note table
/******************************************************************** */

class UserServices {

    /********************fileUpload ******************** */
    // Description: This function will call the imgUpload() of imgUpload services by
    // sending req as param. for further execuation of searching mechanism
    /************************************************ */

    imgUpload(filename, id, file) {
        return new Promise((resolve, reject) => {
            // aws4.upload
            module.exports.file = file;
            img.findUser(id, User)
                .then(data => {
                    if (data.length == 0) {
                        console.log(" data not found");
                        reject('data not found.....................: ')
                    }
                    else {
                        img.addImage(filename, id)
                            .then((data) => {
                                resolve('successfully found.....................: ', data)
                                return data
                            })
                            .catch(err => {
                                reject('Unable to upload image...: ' + err)
                            })
                    }
                })
                .catch(err => {
                    reject('id--- not found: ' + err)
                })
        })
    }


}

module.exports = new UserServices()