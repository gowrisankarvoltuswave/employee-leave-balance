var models = require('../models');
var db = models.sequelize.models;
// var jsdom = require("jsdom");

// var JSDOM = jsdom.JSDOM;

// const dom = new JSDOM('<!DOCTYPE html>');
var vehicleobj = {};

/*get all content*/
vehicleobj.list = function (req, res, next) {
    db.vehicles.findAll().then(function (response) {
        res.json({
            success: true,
            data: response,
            message: "This data showed based on JWT"
        });
    }).catch(function (error) {
        res.json({
            success: false,
            data: null,
            message: "error" + error
        });
    });

};

vehicleobj.create = function (req, res, next) {
    console.log(req.body.name);
    db.vehicles.create({                             // classes mean model name
        class: req.body.name
    }).then(function (response) {
        res.json({
            success: true,
            data: response,
            message: "Class added successfully"
        })
    }).catch(function (response) {
        res.json({
            success: false,
            data: response,
            message: "failed to add class"
        });
    })
};

vehicleobj.read = function (req, res, next) {
    res.json(req.response)

};

module.exports = vehicleobj;