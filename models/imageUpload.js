const userModel = require("../models/user")
var noteModel = require("../models/note")
noteModel = noteModel.noteModel
class UploadImg {

    /* ***************************************************** */
    // Description:This function calling from note function services. This contains findOne() 
    // of sequelize to find note id based on user input by passing req as param
    /***************************************************** */
    findUser = (id) => {     
        return noteModel.findOne({
            where: {
                noteid: id
            }
        })
    }

    /* ***************************************************** */
    // Description:This function calling from note functions services. This contains update() 
    // of sequelize to update the db with the selected image name input by passing req as param
    /***************************************************** */
    addImage = (filename, id) => {
        return noteModel.update({ noteimg: filename }, { where: { noteid: id } })//update method of sequelize package
            .then((result) => {
                return result
            })
            .catch((err) => {
                logger.error(err, "Error in updating image");
            })
    }
}

module.exports = new UploadImg()