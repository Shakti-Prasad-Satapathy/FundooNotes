const img = require("../models/imageUpload")
const User = require("../models/user")
const logger = require("../config/logger")

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

    imgUpload(filename, id, image) {
        return new Promise((resolve, reject) => {
            // aws4.upload
            module.exports.file = image;
            img.findUser(id)    // calling findUser() of image upload model to find particular note id to set the image
                .then(data => {
                    if (data.length == 0) { // condeion to check whether the note is found or not for further execuation of img upload
                        logger.error(" data not found");
                        reject('data not found.....................: ')
                    }
                    // if note id is found
                    else {
                        img.addImage(filename, id)  // calling addImage() of image upload model to add image link in db
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