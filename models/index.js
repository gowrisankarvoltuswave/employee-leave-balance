var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
// var query = require('log4js');
// var start = query.getLogger('querys');
// var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];






var sequelize = new Sequelize("Usersdb", "vw-lap-005", "Apple#123", {
    host: "192.168.1.231",
    password : 'Apple#123',
    dialect: "mysql",
    port: 6603,
});
// sequelize.sync({ logging: console.log })

var db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;