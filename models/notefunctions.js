const Sequelize = require("sequelize")
const Op = Sequelize.Op;
var noteModel = require("../models/note")
noteModel = noteModel.noteModel

class Collaborator {

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findAll() of 
    // sequelize to findall note based on input data by passing req 
    /***************************************************** */

    findAllUser = (title) => {
        return noteModel.findAll({  // findAll() of sequelize to find all matches
            where: {
                title: {
                    [Op.like]: '%' + title + '%'    // it helps to find the related title stored in db
                }                                   //eg. on find "abc" it will show "...abc..." where ... means any cherector
            }
        })
    }
    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findAll() of 
    // sequelize to find the note id is present or not based on input data by passing req 
    /***************************************************** */

    findnoteid = (noteid) => {
        return noteModel.findAll({ // findAll() of sequelize to find all matches
            where: {
                noteid: noteid //checking if the userid sent by client is present in the db(valid)
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains update() of 
    // sequelize to update the reminder field based on input data by passing req
    /***************************************************** */

    updateRemender = (noteid, remainder) => {
        return new Promise((resolve, reject) => {
            noteModel.update({ remainder: remainder }, { where: { noteid: noteid } })   //update the reminder field based on the condetion of checking note id 
                .then(() => {
                    resolve('done');
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the archive field to true
    /***************************************************** */

    updateArchive = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ is_archived: "true" }, { where: { noteid: noteid } })    //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the is_archive field to false
    /***************************************************** */

    updateUnArchive = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ is_archived: "false" }, { where: { noteid: noteid } })   //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findAll() of 
    // sequelize to find all notes which contains the is archive field is true with taking userid 
    // by params to find all archived notes of a particular user
    /***************************************************** */

    showArchive = (userid) => {
        return noteModel.findAll({  // findAll() of sequelize package
            where: {
                is_archived: "true",    // codetion to find ia archive field of the particular user is true
                userid: userid  // condetion to find notes of a particular user
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the is_trash field to true
    /***************************************************** */

    updateTrash = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ is_trashed: "true" }, { where: { noteid: noteid } })    //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the is_trash field to false
    /***************************************************** */

    updateUnTrash = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ is_trashed: "false" }, { where: { noteid: noteid } })    //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findAll() of 
    // sequelize to find all notes which contains the is archive field is true with taking userid 
    // by params to find all trashed notes of a particular user
    /***************************************************** */

    showTrash = (userid) => {
        return noteModel.findAll({  // findAll() of sequelize package
            where: {
                is_trashed: "true",    // codetion to find ia archive field of the particular user is true
                userid: userid  // condetion to find notes of a particular user
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findOne() of 
    // sequelize to find the value of color field of a particular note based on input data by noteid
    /***************************************************** */

    getColor = (noteid) => {
        return noteModel.findOne({  // findOne() of sequelize package
            where: {
                noteid: noteid,     // condetion to find notes of a particular note
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the color field to the selected color code
    /***************************************************** */

    updateColor = (noteid, notecolor) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ notecolor: notecolor }, { where: { noteid: noteid } })   //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the pin field to true
    /***************************************************** */

    updatePin = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ is_pined: "true" }, { where: { noteid: noteid } })   //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the pin field to false
    /***************************************************** */

    updateUnPin = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ is_pined: "false" }, { where: { noteid: noteid } })  //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }
    
    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findnoteid() of 
    // note functions to check whether the requested note is present or not and update() of sequelize 
    // to update the lable field with the requested lable by user
    /***************************************************** */

    updateLable = (noteid, lable) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid) // calling findnoteid() to check whether the note is present or not
                .then(data => {
                    if (data.length != 0) { // condetion for checking the note is present or not for further execution
                        noteModel.update({ lable: lable }, { where: { noteid: noteid } })     //update method of sequelize package
                            .then(() => {
                                resolve('done');
                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from noteFunction services. This contains findAll() of 
    // sequelize to find all notes which contains the is lables field having some value with taking
    // userid by params to find all labled notes of a particular user
    /***************************************************** */

    showlables = (lable, userid) => {
        return noteModel.findAll({  // findAll() of sequelize package
            where: {
                lable: lable,   // condetion to find all notes of a particular user having the user requested lable
                userid: userid  // condetion to find notes of a particular user
            }
        })
    }
    
}

module.exports = new Collaborator()