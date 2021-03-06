const Sequelize = require("sequelize")
const db = require("../database/db.js")
const Op = Sequelize.Op;


// Schema of notes table

var noteModel = db.sequelize.define(
    'notes',
    {
        noteid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncriment: true
        },
        userid: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        colabuser: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        remainder: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        is_archived: {
            type: Sequelize.STRING,
            defaultValue: "false"
        },
        is_trashed: {
            type: Sequelize.STRING,
            defaultValue: "false"
        },
        notecolor: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        noteimg: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        is_pined: {
            type: Sequelize.STRING,
            defaultValue: 'false'
        },
        lable: {
            type: Sequelize.STRING,
            defaultValue: null
        },
    },
    {
        timestamps: false
    }

)


/***************************************************** */
// Description:This class contains: findNote(), findAllNote(), createNote(), UpdateNote()
// and DeleteNote() calling from users services
//
/***************************************************** */

class NoteOperetions {

    /***************************************************** */
    // Description:This function calling from users services. This contains findOne() 
    // of sequelize to find 1st exact note based on user input by passing req as param
    /***************************************************** */

    findNote = (noteid) => {
        return noteModel.findOne({
            where: {
                noteid: noteid//checking if the email address sent by client is present in the db(valid)
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from users services. This contains findAll() 
    // of sequelize to check all notes based on user input by passing req as param
    /***************************************************** */

    findAllNote = (userid) => {
        return noteModel.findAll({
            where: {
                userid: userid, //checking if the userid sent by client is present in the db(valid)
                is_trashed: 'false'
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from users services. This contains findAll() 
    // of sequelize to find user id is present or not based on user input by passing req as param
    /***************************************************** */

    finduserid = (userid) => {
        return noteModel.findAll({ // findAll() of sequelize to find all matches
            where: {
                userid: userid //checking if the userid sent by client is present in the db(valid)
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from users services. This contains findAll() 
    // of sequelize to find note id is present or not based on user input by passing req as param
    /***************************************************** */

    findnoteid = (noteid) => {
        return noteModel.findAll({ // findAll() of sequelize to find all matches
            where: {
                noteid: noteid //checking if the userid sent by client is present in the db(valid)
            }
        })
    }

    /***************************************************** */
    // Description:This function calling from users services. This contains create() of 
    // sequelize to create the note based on input data by passing noteData as param
    /***************************************************** */
    createNote = (noteData, userid) => {
        return new Promise((resolve, reject) => {
            noteModel.create(noteData, userid)//create method of sequelize package to create new record
                .then(user => {
                    resolve(user)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from users services. This contains update() of 
    // sequelize to update the note based on input data by passing req & editkey as param
    /***************************************************** */

    UpdateNote = (noteid, editkey) => {
        return new Promise((resolve, reject) => {
            noteModel.update({ content: editkey }, { where: { noteid: noteid } })
                .then((data) => {
                    resolve("success......fl")
                })
                .catch(err => {
                    reject("Error in updating note", err)
                })
        })
    }

    /***************************************************** */
    // Description:This function calling from users services. This contains update() of 
    // sequelize to update the note based on input data by passing req & editkey as param
    /***************************************************** */

    DeleteNote = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findNote(noteid)  // Check requested note is present or not in db
                .then((data) => {
                    if (data.length != 0) {
                        noteModel.destroy({ // If Present then delete it using destroy() of sequelize
                            where: { noteid: noteid }  // Setting condetion to finding the exact match
                        })
                            .then(result => {
                                resolve(result)
                            })
                            .catch(error => {
                                reject(error)
                            })
                    }
                    else {
                        reject("Sorry Some issue come in deleting the note")
                    }
                })
                .catch(err => {
                    reject("Sorry no such note found", err)
                })
        })
    }

}

module.exports = { NoteOperetions, noteModel }

