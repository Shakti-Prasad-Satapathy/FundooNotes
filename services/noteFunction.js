const noteFunction = require("../models/notefunctions")
const moment = require("moment")
const notifier = require('node-notifier');
var cron = require('node-cron');
const User = require("../models/user")


class UserServices {

    search(title) {
        return new Promise((resolve, reject) => {
            var searcharr = [];
            noteFunction.findAllUser(title)
                .then(data => {


                    if (data.length == 0) {
                        console.log("===============???", data.length);
                        console.log(" data not found");
                        reject('data not found.....................xxxxxx: ')
                    }
                    else {

                        data.filter(element => {
                            // return element.dataValues.email,
                            searcharr.push(element)
                        })

                        resolve(searcharr)
                        console.log("=====================inside then---------------------", searcharr)
                    }
                })
                .catch(err => {
                    reject('email not found: ' + err)
                })
        })
    }


    setRemendre(remainder, noteid) {
        return new Promise((resolve, reject) => {
            let inputDate = remainder
            noteFunction.updateRemender(noteid, remainder)
                .then(() => {
                    cron.schedule('* * * * * *', () => {
                        var curranteDate = new Date();
                        let dateinformat = moment(curranteDate).format('MM-DD-YYYY, HH:mm');
                        let dateinformattwo = moment(inputDate).format('MM-DD-YYYY, HH:mm');

                        console.log(dateinformattwo, "================", dateinformat);
                        if (inputDate == dateinformat) {
                            notifier.notify({
                                title: 'My notification',
                                message: 'Hello, You have some Remender..... please check....'
                            });
                        }
                        resolve("Perfectly done")
                    });

                })
                .catch((error) => {
                    console.log("88888888888888");
                    
                    reject(error)
                })
        })
    }
    setArchive(noteid) {
        return noteFunction.updateArchive(noteid)

    }
    setUnArchive(noteid) {
        return noteFunction.updateUnArchive(noteid)

    }


    showarchive(logintoken) {
        return new Promise((resolve, reject) => {
            User.finduser(logintoken)
                .then(userid => {
                    noteFunction.showArchive(userid)
                        .then((data) => {
                            // var archivelist = []
                            // data.filter(element => {
                            //     // return element.dataValues.noteid,
                            //     archivelist.push(element.dataValues.noteid)
                            // })
                            // console.log(archivelist);

                            resolve(data);

                        })
                        .catch((err) => {
                            reject(err, 'not done');
                        })
                })
                .catch((errr) => {
                    reject(errr, 'not done');
                })

        })
    }

    setTrash(noteid) {
        return noteFunction.updateTrash(noteid)
    }
    setColor(noteid, notecolor) {
        return noteFunction.updateColor(noteid, notecolor)
    }
    setUnTrash(noteid) {
        return noteFunction.updateUnTrash(noteid)

    }

    showTrash(logintoken) {
        return new Promise((resolve, reject) => {

            // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            User.finduser(logintoken)
                .then(userid => {
                    // console.log(",,,,,,,,,,,,,,,,,,,,,,,,,", userid);

                    noteFunction.showTrash(userid)

                        .then((data) => {

                            // var thrashlist = []
                            // data.filter(element => {
                            //     // return element.dataValues.noteid,
                            //     trashlist.push(element.dataValues.noteid)
                            // })
                            console.log("Success......Success......Success......");

                            resolve(data);

                        })
                        .catch((err) => {
                            reject(err, 'not done');
                        })
                })
                .catch((errr) => {
                    reject(errr, 'not done');
                })

        })
    }
    getColor(noteid) {
        return new Promise((resolve, reject) => {

            // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            // User.finduser(logintoken)
            //     .then(userid => {
            //         console.log(",,,,,,,,,,,,,,,,,,,,,,,,,", userid);

                    noteFunction.getColor(noteid)

                        .then((data) => {

                            // var thrashlist = []
                            // data.filter(element => {
                            //     // return element.dataValues.noteid,
                            //     trashlist.push(element.dataValues.noteid)
                            // })
                            console.log("Success......Success......Success......",data.dataValues.notecolor);

                            resolve(data.dataValues.notecolor);

                        })
                        .catch((err) => {
                            reject(err, 'not done');
                        })
                // })
                // .catch((errr) => {
                //     reject(errr, 'not done');
                // })

        })
    }
}




module.exports = new UserServices()