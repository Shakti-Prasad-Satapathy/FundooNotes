const Sequelize = require("sequelize")
const Op = Sequelize.Op;
var noteModel = require("../models/note")
noteModel = noteModel.noteModel


class Collaborator {


    findAllUser = (title) => {
        return noteModel.findAll({
            where: {
                title: {
                    [Op.like]: '%' + title + '%'
                }
            }
        })
    }

    findnoteid = (noteid) => {
        return noteModel.findAll({ // findAll() of sequelize to find all matches
            where: {
                noteid: noteid //checking if the userid sent by client is present in the db(valid)
            }
        })
    }

    updateRemender = (noteid, remainder) => {
        return new Promise((resolve, reject) => {


            noteModel.update({ remainder: remainder }, { where: { noteid: noteid } })//create method of sequelize package

                .then(() => {
                    console.log("//////////////////");

                    resolve('done');

                })
                .catch((err) => {
                    reject(err, 'not done');
                })

        })
    }
    updateArchive = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid)
                .then(data => {
                    console.log(data.length, "=================///");

                    if (data.length != 0) {
                        console.log(data.length);
                        noteModel.update({ is_archived: "true" }, { where: { noteid: noteid } })//create method of sequelize package
                            .then(() => {
                                console.log("//////////////////");

                                resolve('done');

                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }
    updateUnArchive = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid)
                .then(data => {
                    console.log(data.length, "=================///");

                    if (data.length != 0) {
                        console.log(data.length);
                        noteModel.update({ is_archived: "false" }, { where: { noteid: noteid } })//create method of sequelize package
                            .then(() => {
                                console.log("//////////////////");

                                resolve('done');

                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }


    showArchive = (userid) => {
        return noteModel.findAll({
            where: {
                is_archived: "true",
                userid: userid

            }
        })
    }

    updateTrash = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid)
                .then(data => {
                    console.log(data.length, "=================///");

                    if (data.length != 0) {
                        console.log(data.length);
                        noteModel.update({ is_trashed: "true" }, { where: { noteid: noteid } })//create method of sequelize package
                            .then(() => {
                                console.log("//////////////////");

                                resolve('done');

                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }
    updateUnTrash = (noteid) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid)
                .then(data => {
                    console.log(data.length, "=================///");

                    if (data.length != 0) {
                        console.log(data.length);
                        noteModel.update({ is_trashed: "false" }, { where: { noteid: noteid } })//create method of sequelize package
                            .then(() => {
                                console.log("//////////////////");

                                resolve('done');

                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    showTrash = (userid) => {
        return noteModel.findAll({
            where: {
                is_trashed: "true",
                userid: userid
            }
        })
    }

    getColor = (noteid) => {
        return noteModel.findOne({
            where: {
                noteid: noteid,
                // userid: userid
            }
        })
    }
    updateColor = (noteid, notecolor) => {
        return new Promise((resolve, reject) => {
            this.findnoteid(noteid)
                .then(data => {
                    console.log(data.length, "=================///");

                    if (data.length != 0) {
                        console.log(data.length);
                        noteModel.update({ notecolor: notecolor }, { where: { noteid: noteid } })//create method of sequelize package
                            .then(() => {
                                console.log("//////////////////");

                                resolve('done');

                            })
                            .catch((err) => {
                                reject(err, 'not done');
                            })
                    }
                    else {
                        reject("Some Error found: Sorry Noteid not found")
                    }
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

}

module.exports = new Collaborator()