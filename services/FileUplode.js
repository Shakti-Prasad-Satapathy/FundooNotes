var imgserv = require("../services/imgUpload")


var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});


var app = express(),
    s3 = new aws.S3();



// var params = { Bucket: "BUCKET_NAME", Key: "OBJECT_KEY" };
// s3.getObject(params, function (err, data) {
//     if (err) {
//         console.error(err.code, "-", err.message);
//         return callback(err);
//     }
//     fs.writeFile('/tmp/filename', data.Body, function (err) {
//         if (err)
//             console.log(err.code, "-", err.message);
//         return callback(err);
//     });
// });
var params = { Bucket: 'fundoonotenodejs', Key: 'err.png' };
s3.getObject(params, function (err, data) {
    if (err)
        return err;
    let buf = Buffer.from(data.Body);
    let base64 = buf.toString('base64');
    // console.log(buf);
    return base64
});


app.use(bodyParser.json());
// let file = imgserv.file;

// const params = {
//     Bucket: BUCKET_NAME,
//     CreateBucketConfiguration: {
//         // Set your region here
//         LocationConstraint: "eu-west-1"
//     }
// };

// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'fundoonotenodejs',
        acl: 'public-read',
        key: function (req, file, cb) {
            // console.log(req.file),"={}{}{}{}{}=";
            console.log("------------------>", file);
            cb(null, file.originalname);
        }
    })
});

// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

module.exports = upload;