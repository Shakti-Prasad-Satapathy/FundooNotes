var Note = require("../models/note")
const { validationResult } = require('express-validator');
const noteService = require("../services/note")


class NoteController {
  /********************createNote ******************** */
  //  Description:  This controll will call createNote() with req as param from notes
  //  services for further process of creating a new note
  /********************************************* */
  createNote = (req, res) => {
    let response = {
      'message': 'Something bad happend',
      'success': false
    };
    try {
      const errors = validationResult(req)

      const today = new Date();
      // var x = localStorage.getItem('token');
      // console.log("55555555555555555555555555555555555",x);
      
      const noteData = {
        logintoken: req.body.logintoken,
        // userid: req.body.userid,
        title: req.body.title,
        content: req.body.content,
        created_at: today,
        updated_at: null,
      }
      if (!errors.isEmpty()) {

      noteService.createNote(noteData)  // calling createNote of notes service
        .then(() => {
          console.log("congrats You Are Successsfully created the note");
          response.message = 'Successfully note created';
          response.success = true;
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'note creation failed. ';
          console.error(response.message + err)
          res.status(400).send(response);
        })
      }
      else{
        console.log("title and contrnt field shouldnot be empty");
        response.message = "Title and Content should not be empty"
        res.status(400).send(response);
        // res.send('title and contrnt field shouldnot be empty')
      }
    }
    catch (error) {
      console.log(response.message + error);
      res.send(response);
    }

  }


  /************************************Read AllNotes ************************************ */
  //  Description:  This controll will call readAllNote() with req as param from notes
  //  services for further process of reading all notes of a user
  /********************************************* */
  readAllNote = (req, res) => {
    let response = {
      'message': 'Something bad happend',
      'success': false
    };
    try {
      const logintoken = req.body.logintoken
      // console.log("111111111111111111111111111111111",logintoken);
      
      noteService.readAllNote(logintoken)  // calling readAllNote of noteservices
        .then((data) => {
          console.log("congrats You Are Successsfully read all note");
          response.message = 'Successfully read all notes';
          response.success = true;
          response.data = {
            'notes': data
          }
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'viewing notes failed. Some issue in reading notes';
          console.error(response.message + err)
          res.status(400).send(response);
        })
    }
    catch (error) {
      console.log(response.message + error);
      res.send(response);
    }

  }

  /************************************update note content ************************************ */
  //  Description:  This controll will call updateNotes() with req and editkey.content as
  //  param from notes services for further process of updating notes of a user
  /********************************************* */
  updateNote = (req, res) => {
    let response = {
      'message': 'Something bad happend',
      'success': false
    };
    try {
      var editkey = {
        content: req.body.content //setting a key for user update
      }
      // const userid = req.body.userid
      const noteid = req.body.noteid
      editkey = editkey.content
      noteService.updateNotes(noteid, editkey)  // calling readAllNote of noteservices
        .then(() => {
          console.log("congrats You Are Successsfully updated the note");
          response.message = 'Successfully updated';
          response.success = true;
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'updetion failed. There is some issue in updating the note';
          console.error(response.message + err)
          res.status(400).send(response);
        })
    }
    catch (error) {
      console.log(response.message + error);
      res.send(response);
    }
  }
  /************************************delete a note ************************************ */
  //  Description:  This controll will call deleteNote() with req as param from notes
  //  services for further process of deleting notes of a user
  /********************************************* */
  deleteNote = (req, res) => {
    let response = {
      'message': 'Something bad happend',
      'success': false
    };
    try {
      const noteid = req.body.noteid
      noteService.deleteNote(noteid)   // calling deleteNote of noteservices
        .then(() => {
          console.log("congrats You Are Successsfully deleted the note");
          response.message = 'Successfully deleted';
          response.success = true;
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'deletion failed. Some issue in deleting the note';
          console.error(response.message + err)
          res.status(400).send(response);
        })
    }
    catch (error) {
      console.log(response.message + error);
      res.send(response);
    }
  }

}
module.exports = new NoteController();
