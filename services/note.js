const Note = require("../models/note");
const Noteobj = new Note.NoteOperetions();
const User = require("../models/user")

/**************************************************************** */
//  This class contains create, update, delete and read operetion services on notes
/**************************************************************** */

class UserServices {

    /************************************************************ */
    //
    // Description:This function calling from notes controller, and calling createNote() of 
    // notes model by passing noteData as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    createNote(noteData) {
        return new Promise((resolve, reject) => {
            User.finduser(noteData.logintoken)  // calling finduser() of note model to get user id by passing noteData and login token as param.
                .then(userid => {
                    noteData['userid'] = userid;
                    Noteobj.createNote(noteData, userid)    // function calling from notes model to create new note by passing noteData and userId as param.
                        .then(note => {
                            resolve(note)
                        })
                        .catch(err => {
                            reject('Sorry unable to create note: ' + err)
                        })
                })
                .catch(err => {
                    reject('Sorry unable Find user: ' + err)
                })
        })
    }

    /************************************************************ */
    //
    // Description:This function calling from notes controller, and calling findAllNote() of 
    // notes model by passing req as param. then using promise resolve the success message
    // and data if note is present else reject the promise
    //
    /***************************************************** */

    readAllNote(logintoken) {
        return new Promise((resolve, reject) => {
            User.finduser(logintoken)   // calling finduser() of note model to get user id by passing login token as param.
                .then(userid => {
                    Noteobj.findAllNote(userid)    // function calling from notes model to find all notes of a particular user by taking userid as param
                        .then(data => {
                            resolve(data)                            
                        })
                        .catch(err => {
                            reject('error: ' + err)
                        })
                })
                .catch(errr => {
                    reject(errr)
                })
        })

    }
    /************************************************************ */
    //
    // Description:This function calling from notes controller, and calling UpdateNote() of 
    // notes model by passing req and editkey as params. then return the result
    //
    /***************************************************** */
    updateNotes(noteid, editkey) {
        return new Promise((resolve, reject) => {
            Noteobj.UpdateNote( noteid, editkey) // function calling from notes model to update note content in notes by taking noteid and editkey as param
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /************************************************************ */
    //
    // Description:This function calling from notes controller, and calling DeleteNote() of 
    // notes model by passing req as param. then return the result
    //
    /***************************************************** */
    deleteNote(noteid) {
        return new Promise((resolve, reject) => {
            Noteobj.DeleteNote(noteid)  // function calling from notes model to delete a particular note by taking note id as param.
                .then(data => {
                    resolve("unable to update", data)
                })
                .catch(err => {
                    reject('error: ' + err)
                })
        })
    }
}

module.exports = new UserServices()