var Note = require("../models/note")
const { validationResult } = require('express-validator');
const noteService = require("../services/note")
const logger = require("../config/logger")

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
      const noteData = {
        logintoken: req.body.logintoken,  // getting login token to create note for the particular user
        title: req.body.title,  // getting title to add title for the note
        content: req.body.content,  // getting content to add title for the note
        created_at: today,
        updated_at: null,
      }
      if (!errors.isEmpty()) {  // checking the validation for further execuation

      noteService.createNote(noteData)  // calling createNote of notes service
        .then(() => {
          logger.info("congrats You Are Successsfully created the note");
          response.message = 'Successfully note created';
          response.success = true;
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'note creation failed. ';
          logger.error(response.message + err)
          res.status(400).send(response);
        })
      }
      else{
        logger.error("title and contrnt field shouldnot be empty");
        response.message = "Title and Content should not be empty"
        res.status(400).send(response);
      }
    }
    catch (error) {
      logger.error(response.message + error);
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
      const logintoken = req.body.logintoken  // getting login token to read all notes for the particular user    
      noteService.readAllNote(logintoken)  // calling readAllNote of noteservices
        .then((data) => {
          logger.info("congrats You Are Successsfully read all note......");
          response.message = 'Successfully read all notes';
          response.success = true;
          response.data = {
            'notes': data
          }
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'viewing notes failed. Some issue in reading notes';
          logger.error(response.message + err)
          res.status(400).send(response);
        })
    }
    catch (error) {
      logger.error(response.message + error);
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
        content: req.body.content //setting a key for user update /getting updated content
      }
      const noteid = req.body.noteid  // getting note id for for update the particular selected note
      editkey = editkey.content
      noteService.updateNotes(noteid, editkey)  // calling readAllNote of noteservices
        .then(() => {
          logger.info("congrats You Are Successsfully updated the note");
          response.message = 'Successfully updated';
          response.success = true;
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'updetion failed. There is some issue in updating the note';
          logger.error(response.message + err)
          res.status(400).send(response);
        })
    }
    catch (error) {
      logger.error(response.message + error);
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
      const noteid = req.body.noteid  // getting note id to exicute deletion for the particular note
      noteService.deleteNote(noteid)   // calling deleteNote of noteservices
        .then(() => {
          logger.info("congrats You Are Successsfully deleted the note");
          response.message = 'Successfully deleted';
          response.success = true;
          res.status(200).send(response);
        })
        .catch(err => {
          response.message = 'deletion failed. Some issue in deleting the note';
          logger.error(response.message + err)
          res.status(400).send(response);
        })
    }
    catch (error) {
      logger.error(response.message + error);
      res.send(response);
    }
  }

}
module.exports = new NoteController();
