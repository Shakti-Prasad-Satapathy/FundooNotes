const notefunctionService = require("../services/noteFunction")

class NoteFunctionController {
    /********************createNote ******************** */
    notesearch = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const title = req.body.title
            notefunctionService.search(title)
                .then((result) => {
                    console.log("congrats Succefully result found");
                    response.message = 'Successfully result found';
                    response.success = true;
                    response.data = {
                        'result': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Faild to find result';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    reminders = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const remainder = req.body.remainder
            const noteid = req.body.noteid
            notefunctionService.setRemendre(remainder, noteid)
                .then(() => {
                    console.log("congrats You Are Successsfully set the reminder");
                    response.message = 'Successfully reminder set';
                    response.success = true;
                    res.status(200).send(response);

                })

                .catch(err => {
                    response.message = 'Some issue occured. Failed to set reminder';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    archive = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid
            notefunctionService.setArchive(noteid)
                .then(() => {
                    console.log("congrats You Are Successsfully archived the note");
                    response.message = 'Successfully archived';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Faild to archive note';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }

        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    unarchive = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid
            notefunctionService.setUnArchive(noteid)
                .then(() => {
                    console.log("congrats You Are Successsfully unarchived the note");
                    response.message = 'Successfully unarchived';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Faild to archive note';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }

        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    showarchive = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const logintoken = req.body.logintoken
            notefunctionService.showarchive(logintoken)
                .then((result) => {
                    console.log("Successfully shown all archived notes");
                    response.message = 'Archived notes shown';
                    response.success = true;
                    response.data = {
                        'notes': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed to show the archived notes';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    trash = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid
            notefunctionService.setTrash(noteid)
                .then(() => {
                    console.log("congrats You Are Successsfully set the note to trash");
                    response.message = 'Successfully note trashed';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'trashing of note failed.';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    untrash = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid
            notefunctionService.setUnTrash(noteid)
                .then(() => {
                    console.log("congrats You Are Successsfully set the note to untrash");
                    response.message = 'Successfully note untrashed';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'untrashing of note failed.';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }
    
    showtrash = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const logintoken = req.body.logintoken
            notefunctionService.showTrash(logintoken)
                .then((result) => {
                    console.log("congrats You Are Successsfully show the note to trash");
                    response.message = 'Successfully trash notes shown';
                    response.success = true;
                    response.data = {
                        'notes': result
                    }
                    // console.log("4747474747474744747474477774447",response.data);
                    
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed with showing trashed notes';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    addnotecolor = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid
            const notecolor = req.body.notecolor
            notefunctionService.setColor(noteid, notecolor)
                .then(() => {
                    console.log("congrats You Are Successsfully set the note color");
                    response.message = 'Successfully color set';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'setting color of note failed.';
                    console.error(response.message + err)
                    res.status(400).send(response);
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }
    getnotecolor = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const noteid = req.body.noteid
            notefunctionService.getColor(noteid)
                .then((result) => {
                    console.log("congrats You Are Successsfully show the note to trash");
                    response.message = 'Successfully trash notes shown';
                    response.success = true;
                    response.data = {
                        'notes': result
                    }
                    // console.log("4747474747474744747474477774447",response.data);
                    
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed with showing trashed notes';
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
module.exports = new NoteFunctionController();
