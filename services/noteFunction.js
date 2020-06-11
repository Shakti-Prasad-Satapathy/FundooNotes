const noteFunction = require("../models/notefunctions")
const moment = require("moment")
const notifier = require('node-notifier');
var cron = require('node-cron');
const User = require("../models/user")

/**************************************************************** */
//  This class contains search, setRemendre, setArchive, setUnArchive, showarchive, setTrash, setColor, 
//  setUnTrash, setPin, setUnpin, setLable, showTrash, getColor, showlables operetion services to execute 
//  varrious note operetions
/**************************************************************** */

class UserServices {

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling findAllUser() of 
    // notefunctions model by passing title as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    search(title) {
        return new Promise((resolve, reject) => {
            var searcharr = [];
            noteFunction.findAllUser(title)
                .then(data => {
                    if (data.length == 0) {
                        reject('data not found.....................xxxxxx: ')
                    }
                    else {
                        data.filter(element => {
                            searcharr.push(element)
                        })
                        resolve(searcharr)
                    }
                })
                .catch(err => {
                    reject('email not found: ' + err)
                })
        })
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateRemender() of 
    // notefunctions model by passing noteid and remaildre as param. then using promise resolve the 
    // success message if note got created else reject the promises 
    //
    /***************************************************** */

    setRemendre(remainder, noteid) {
        return new Promise((resolve, reject) => {
            let inputDate = remainder
            noteFunction.updateRemender(noteid, remainder)
                .then(() => {
                    cron.schedule('* * * * * *', () => {
                        var curranteDate = new Date();
                        let dateinformat = moment(curranteDate).format('MM-DD-YYYY, HH:mm');
                        let dateinformattwo = moment(inputDate).format('MM-DD-YYYY, HH:mm');
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
                    reject(error)
                })
        })
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateArchive() of 
    // notefunctions model by passing noteid as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setArchive(noteid) {
        return noteFunction.updateArchive(noteid)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateUnArchive() of 
    // notefunctions model by passing noteid as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setUnArchive(noteid) {
        return noteFunction.updateUnArchive(noteid)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling finduser() of 
    // notefunctions model by passing logintoken as param, to authenticate the user and get userid 
    // showArchive() of notefunctions model by tzking userid as param, then using promise resolve the 
    // success message if note got created else reject the promises 
    //
    /***************************************************** */

    showarchive(logintoken) {
        return new Promise((resolve, reject) => {
            User.finduser(logintoken)
                .then(userid => {
                    noteFunction.showArchive(userid)
                        .then((data) => {
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

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateTrash() of 
    // notefunctions model by passing noteid as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setTrash(noteid) {
        return noteFunction.updateTrash(noteid)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateColor() of 
    // notefunctions model by passing noteid and notecolor as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setColor(noteid, notecolor) {
        return noteFunction.updateColor(noteid, notecolor)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateUnTrash() of 
    // notefunctions model by passing noteid as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setUnTrash(noteid) {
        return noteFunction.updateUnTrash(noteid)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updatePin() of 
    // notefunctions model by passing noteid as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setPin(noteid) {
        return noteFunction.updatePin(noteid)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateUnPin() of 
    // notefunctions model by passing noteid as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setUnpin(noteid) {
        return noteFunction.updateUnPin(noteid)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling updateUnArchive() of 
    // notefunctions model by passing noteid and lable as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    setLable(noteid, lable) {
        return noteFunction.updateLable(noteid, lable)
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling finduser() of 
    // notefunctions model by passing logintoken as param, to authenticate the user and get userid 
    // showTrash() of notefunctions model by taking userid as param, then using promise resolve the 
    // success message if note got created else reject the promises 
    //
    /***************************************************** */

    showTrash(logintoken) {
        return new Promise((resolve, reject) => {
            User.finduser(logintoken)
                .then(userid => {
                    noteFunction.showTrash(userid)
                        .then((data) => {
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

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling getColor() of 
    // notefunctions model by passing noteid as param. then using promise resolve the success message
    // if note got created else reject the promises 
    //
    /***************************************************** */

    getColor(noteid) {
        return new Promise((resolve, reject) => {
            noteFunction.getColor(noteid)
                .then((data) => {
                    resolve(data.dataValues.notecolor);
                })
                .catch((err) => {
                    reject(err, 'not done');
                })
        })
    }

    /************************************************************ */
    //
    // Description:This function calling from NoteFunctions controller, and calling finduser() of 
    // notefunctions model by passing logintoken as param, to authenticate the user and get userid 
    // showlables() of notefunctions model by taking userid and lable as param, then using promise resolve the 
    // success message if note got created else reject the promises 
    //
    /***************************************************** */

    showlables(lable, logintoken) {
        return new Promise((resolve, reject) => {
            User.finduser(logintoken)
                .then(userid => {
                    noteFunction.showlables(lable, userid)
                        .then((data) => {
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
}

module.exports = new UserServices()