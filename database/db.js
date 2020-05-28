const Sequelize = require("sequelize")
const db = {}

const sequelize = new Sequelize('fundoonotes', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;