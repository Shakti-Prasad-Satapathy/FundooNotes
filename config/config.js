// var mysql = require('mysql');
// class DBConnection {
//     constructor() {
//         this.dbconnection = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: 'admin',
//             database: 'fundoonotes'
//         });
//     }
//     dbConnection() {
//         this.dbconnection.connect(function (err) {
//             if (!err) {
//                 console.log("Database is connected");
//             } else {
//                 console.log("Error while connecting with database");
//             }
//         });
//     }  
// }
// var configobj = new DBConnection()
// module.exports = configobj;

const Sequelize = require('sequelize');

const dbconnection = new Sequelize('fundoonotes', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});

dbconnection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = dbconnection;