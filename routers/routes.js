const express = require('express');
const router = express.Router();
const upload = require('../services/FileUplode')
const { check } = require('express-validator');



var usersController=require('../controller/users');
var notesController=require('../controller/notes');
var collaboration=require('../controller/collaborator');
var fileUpLoad=require('../controller/fileupload');
var noteFunctions = require('../controller/NoteFunctions')


/*********** Routs for users *************************** */
router.post('/register', [check('Name', 'Full Name is required').isEmpty(),check('email').isEmail(),check("pass", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")], usersController.register); 
    
router.post('/login',[check('email').isEmail(),check("pass", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")],usersController.login);
router.post('/forgotPassword', usersController.forgotPassword );
// router.post('/profile', usersController.profile);

/************************* routes for notes ********************** */
router.post('/createNote',[check('title', 'Title is required').isEmpty(),check('content', 'Content is required').isEmpty()], notesController.createNote );
router.post('/readNote', notesController.readAllNote );
router.put('/updateNote', notesController.updateNote );    //post => put
router.delete('/deleteNote', notesController.deleteNote );    //post => delete

/************************* routes for collaborators ********************** */
router.post('/search', collaboration.search );
router.post('/createCollaborator', collaboration.createCollaborator );

/**************************** File Uplode in AWS S3 *******************************/
router.post('/fileUpload', upload.single('image'), fileUpLoad.fileUpload );
// console.log(base64,"KKKKKKK");

/************** Other Note Functlsionality**************** */
router.post('/reminders', noteFunctions.reminders );
router.post('/notesearch', noteFunctions.notesearch );
router.post('/archive', noteFunctions.archive );
router.post('/unarchive', noteFunctions.unarchive );
router.post('/showarchive', noteFunctions.showarchive );
router.post('/trash', noteFunctions.trash );
router.post('/untrash', noteFunctions.untrash );
router.post('/showtrash', noteFunctions.showtrash );

router.post('/pin', noteFunctions.pin );
router.post('/unpin', noteFunctions.unpin );

router.post('/addnotecolor', noteFunctions.addnotecolor );
router.post('/getnotecolor', noteFunctions.getnotecolor );

router.post('/addlable', noteFunctions.addLable );
router.post('/getlable', noteFunctions.getLable );



module.exports = router