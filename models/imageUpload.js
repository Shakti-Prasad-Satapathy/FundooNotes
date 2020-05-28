const userModel = require("../models/user")
var noteModel = require("../models/note")
noteModel = noteModel.noteModel
class UploadImg {

    findUser = (id, User) => {
        // console.log(req.query,"==============");
        
        return noteModel.findOne({
            where: {
                noteid: id
            }
        })
    }



    addImage = (filename, id) => {
        // let x = req.file.filename
        // // x = x.toString()
        console.log("=========Done Update query running",filename);

        return noteModel.update({ noteimg: filename }, { where: { noteid: id } })//update method of sequelize package
            .then((result) => {
                // var result = {
                //     file: req.file,
                //     id: req.query.id
                // }
                console.log("in model", result);
                
                return result
            })
            .catch((err) => {
                console.log(err, "Error in updating image");

            })

    }

}

module.exports = new UploadImg()