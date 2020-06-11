const notefunctionService = require("../services/noteFunction")
const logger = require("../config/logger")

class NoteFunctionController {

    /********************notesearch ******************** */
    // Description: This function will call the notesearch() of notes services by sending req
    // as param. for further execuation of searching mechanism
    /************************************************ */
    notesearch = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const title = req.body.title    // getting note title as request
            notefunctionService.search(title)
                .then((result) => {
                    logger.info("congrats Succefully result found");
                    response.message = 'Successfully result found';
                    response.success = true;
                    response.data = {
                        'result': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Faild to find result';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************reminders ******************** */
    // Description: This function will call the reminders() of notes services by sending req
    // as param. for further execuation of setting reminder
    /************************************************ */
    reminders = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const remainder = req.body.remainder    //getting reminder date by request
            const noteid = req.body.noteid  // getting note id to set reminder for the particular note
            notefunctionService.setRemendre(remainder, noteid)  // calling setRemendre() of note services 
                .then(() => {
                    logger.info("congrats You Are Successsfully set the reminder");
                    response.message = 'Successfully reminder set';
                    response.success = true;
                    res.status(200).send(response);

                })
                .catch(err => {
                    response.message = 'Some issue occured. Failed to set reminder';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************archive ******************** */
    // Description: This function will call the archive() of notes services by sending req
    // as param. for further execuation of setting archive
    /************************************************ */
    archive = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to set archive for the particular note
            notefunctionService.setArchive(noteid)  // calling setArchive() of note services 
                .then(() => {
                    logger.info("congrats You Are Successsfully archived the note");
                    response.message = 'Successfully archived';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Faild to archive note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }

        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************unarchive ******************** */
    // Description: This function will call the unarchive() of notes services by sending req
    // as param. for further execuation of setting unarchive
    /************************************************ */
    unarchive = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to set unarchive for the particular note
            notefunctionService.setUnArchive(noteid)    // calling setUnArchive() of note services
                .then(() => {
                    logger.info("congrats You Are Successsfully unarchived the note");
                    response.message = 'Successfully unarchived';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Faild to archive note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }

        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************unarchive ******************** */
    // Description: This function will call the showarchive() of notes services by sending req
    // as param. for further execuation of show archived notes
    /************************************************ */
    showarchive = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const logintoken = req.body.logintoken  // getting logintoken to get unarchive for the particular user 
            notefunctionService.showarchive(logintoken) // calling showarchive() of note services
                .then((result) => {
                    logger.info("Successfully shown all archived notes");
                    response.message = 'Archived notes shown';
                    response.success = true;
                    response.data = {
                        'notes': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed to show the archived notes';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************trash ******************** */
    // Description: This function will call the trash() of notes services by sending req
    // as param. for further execuation of set notes to trash
    /************************************************ */

    trash = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to set trash for the particular note
            notefunctionService.setTrash(noteid)    // calling setTrash() of note services
                .then(() => {
                    logger.info("congrats You Are Successsfully set the note to trash");
                    response.message = 'Successfully note trashed';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'trashing of note failed.';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************untrash ******************** */
    // Description: This function will call the untrash() of notes services by sending req
    // as param. for further execuation of set notes to untrash
    /************************************************ */
    untrash = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to set untrash for the particular note
            notefunctionService.setUnTrash(noteid)  // calling setUnTrash() of note services
                .then(() => {
                    logger.info("congrats You Are Successsfully set the note to untrash");
                    response.message = 'Successfully note untrashed';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'untrashing of note failed.';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************showtrash ******************** */
    // Description: This function will call the untrash() of notes services by sending req
    // as param. for further execuation of showing trashed note
    /************************************************ */
    showtrash = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const logintoken = req.body.logintoken  // getting logintoken to get trashed for the particular user 
            notefunctionService.showTrash(logintoken)   // calling showTrash() of note services
                .then((result) => {
                    logger.info("congrats You Are Successsfully show the trashed note ");
                    response.message = 'Successfully trash notes shown';
                    response.success = true;
                    response.data = {
                        'notes': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed with showing trashed notes';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************addnotecolor ******************** */
    // Description: This function will call the untrash() of notes services by sending req
    // as param. for further execuation of addnotecolor()
    /************************************************ */
    addnotecolor = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to set note color for the particular note
            const notecolor = req.body.notecolor    // getting note color to set a particular to the selected note
            notefunctionService.setColor(noteid, notecolor) // calling setColor() of note services
                .then(() => {
                    logger.info("congrats You Are Successsfully set the note color");
                    response.message = 'Successfully color set';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'setting color of note failed.';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************getnotecolor ******************** */
    // Description: This function will call the untrash() of notes services by sending req
    // as param. for further execuation of getnotecolor()
    /************************************************ */
    getnotecolor = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to get note color for the particular note
            notefunctionService.getColor(noteid)    // calling getColor() of note services
                .then((result) => {
                    // logger.info("allnotecolor is read");
                    response.message = 'Successfully trash notes shown';
                    response.success = true;
                    response.data = {
                        'notes': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed with showing trashed notes';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************pin ******************** */
    // Description: This function will call the pin() of notes services by sending req
    // as param. for further execuation of pin()
    /************************************************ */
    pin = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to add pin for the particular note
            notefunctionService.setPin(noteid)  // calling setPin() of note services
                .then(() => {
                    logger.info("congrats You Are Successsfully pin the note");
                    response.message = 'Successfully note pined';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Failed to pin the note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************unpin ******************** */
    // Description: This function will call the unpin() of notes services by sending req
    // as param. for further execuation of unpin()
    /************************************************ */
    unpin = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to unpin the particular note
            notefunctionService.setUnpin(noteid)    // calling setUnpin() of note services
                .then(() => {
                    logger.info("congrats You Are Successsfully unpin the note");
                    response.message = 'Successfully note unpined';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Failed to unpin the note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************addLable ******************** */
    // Description: This function will call the addLable() of notes services by sending req
    // as param. for further execuation of addLable()
    /************************************************ */
    addLable = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid  // getting note id to add lable for the particular note
            const lable = req.body.lable    // getting lable to set note lable for the selected note

            notefunctionService.setLable(noteid, lable) // calling setLable() of note services
                .then(() => {
                    logger.info("congrats You Are Successsfully add the note lable");
                    response.message = 'Successfully note labled';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Failed to add lable in note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /********************getLable ******************** */
    // Description: This function will call the getLable() of notes services by sending req
    // as param. for further execuation of getLable()
    /************************************************ */
    getLable = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const logintoken = req.body.logintoken  // getting logintoken to get lables of the particular user
            const lable = req.body.lable    // getting lable to find notes with the inpured/ selected lable
            notefunctionService.showlables(lable, logintoken)   // calling showlables() of note services
                .then((result) => {
                    logger.info("congrats You Are Successsfully show the note lables");
                    response.message = 'Successfully note lable shown';
                    response.success = true;
                    response.data = {
                        'notes': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed with showing note lables';
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
module.exports = new NoteFunctionController();
