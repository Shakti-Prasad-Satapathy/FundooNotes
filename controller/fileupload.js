var imgupload = require("../services/imgUpload")
const notifier = require('node-notifier');


/*********************************************************** */
// This class contains 2 controller ie. search and add collab where search will search the
// user, to whom we want to collab and createCollaborator will add the collab users id to 
//the note table
/******************************************************************** */

class FileUploadController {
    /********************fileUpload ******************** */
    // Description: This function will call the imgUpload() of imgUpload services by
    // sending req as param. for further execuation of searching mechanism
    /************************************************ */

    fileUpload = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const id = req.body.noteid
            const file = req.body.file
            // const image = req.body.file
            const filename = req.body.filename

            console.log(req.body, "***********", id, "**************", file);
            //  console.log("**************///",file);



            return imgupload.imgUpload(filename, id, file) // calling imgUpload() of imgUpload service
                .then((result) => {
                    console.log("congrats You Are Successsfully upload the image");
                    response.message = 'Successfully image uploaded';
                    response.success = true;
                    
                    // console.log("4747474747474744747474477774447",response.data);

                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'failed with uploading image';
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
module.exports = new FileUploadController();
