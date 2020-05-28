const colabService = require("../services/collaborator")

/*********************************************************** */
// This class contains 2 controller ie. search and add collab where search will search the
// user, to whom we want to collab and createCollaborator will add the collab users id to 
//the note table
/******************************************************************** */
class CollabController {
    /********************search ******************** */
    // Description: This function will call the search() of collab servicesby sending req
    // as param. for further execuation of searching mechanism
    /************************************************ */
    search = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            if (typeof req.body.email === 'undefined') {
                console.log('undefined email');
                throw new Error('undefined email')

            }
            const email = req.body.email
            colabService.search(email)    // calling search() of collabservices
                .then((data) => {
                    console.log("Search Result Found");
                    response.message = 'result found';
                    response.success = true;
                    response.data = {
                        "data" : data
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'No result found, there is no such email registered';
                    console.error(response.message + err)
                    res.status(400).send(response)
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }
    }

    /********************search ******************** */
    // Description: This function will call the createCollaborator() of collab services
    // by sending req as param. for further execuation of adding collab user mechanism
    /************************************************ */

    createCollaborator = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const userid = req.body.userid
            const noteid = req.body.noteid
            colabService.createCollaborator(userid, noteid)
                .then(() => {
                    console.log("congrats You Are Successsfully set Collaborator");
                    response.message = 'collaborator set';
                    response.success = true;
                    
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Some issu is colaboration';
                    console.error(response.message + err)
                    res.status(400).send(response)
                })
        }
        catch (error) {
            console.log(response.message + error);
            res.send(response);
        }   
    }
}
module.exports = new CollabController();
