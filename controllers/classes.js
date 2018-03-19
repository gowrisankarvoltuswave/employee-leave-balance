var models = require('../models');
var db = models.sequelize.models;
var fs = require('fs')

var conversion = require("phantom-html-to-pdf")();

// var jsdom = require("jsdom");

// var JSDOM = jsdom.JSDOM;

// const dom = new JSDOM('<!DOCTYPE html>');
var classobj = {};

/*get all content*/
classobj.list = function (req, res, next) {
    db.classes.findAll({
        include: [db.students]
    }).then(function (contents) {

        /************************************************************************/




        /************************************************************************/


        res.json({
            success: true,
            data: contents,
            message: "contents"
        });
    }).catch(function (error) {
        res.json({
            success: false,
            data: null,
            message: "error" + error
        });
    });

};

classobj.create = function (req, res, next) {
    console.log(req.body.name);
    db.classes.create({                             // classes mean model name
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

classobj.read = function (req, res, next) {
    res.json(req.response)

};

classobj.get = function (req, res, next) {
    console.log('er' + req.param.id)
    db.classes.get({
        where: {
            id: req.param.id
        }
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

classobj.classById = function (req, res, next, id) { // let me understand this
    db.classes.find({
        where: {
            id: id
        }
    }).then(function (response) {
        if (response) {
            req.response = response;
            next();                         // where it goes ? get call.read ok wait  klet me do update call
            /*res.json({
                success:true,
                data:response,
                message:"no data found"
            });*/
        }
        else {
            res.json({
                success: false,
                data: null,
                message: "no data found"
            });
        }
    }).catch(function (error) {
        res.json({
            success: false,
            data: null,
            message: "error"
        });
    });
};

classobj.update = function (req, res, next) {
    var responsee = req.response;
    db.classes.update(req.body, {
        where: {
            id: responsee.id
        }
    }).then(function (response) {
        res.json({
            success: true,
            message: "content updated successfully"
        });
    }).catch(function (error) {
        res.json({
            success: false,
            message: "error"
        });
    });
};


/*/!*create content*!/
classobj.create = function (req, res, next) {
    db.contents.create({
        en:req.body.en,
        th:req.body.th,
        alias:req.body.alias,
        viewId:req.body.viewId
    }).then(function (content) {
        res.json({
            success:true,
            data:content,
            message:"content added successfully"
        });
    }).catch(function (error) {
        res.json({
            success:false,
            data:null,
            message:"error"
        });
    });
};

/!*get content by id*!/
content.read=function (req,res,next) {
    res.json(req.content)
};

/!*update content By ID*!/
content.update=function (req,res,next) {
    var content=req.content;
    db.contents.update(req.body,{
        where:{
            id:content.id
        }
    }).then(function (content) {
        res.json({
            success:true,
            message:"content updated successfully"
        });
    }).catch(function (error) {
        res.json({
            success:false,
            message:"error"
        });
    });
};

/!*get content by ID*!/
content.getById=function (req,res,next,id) {
    db.contents.find({
        where:{
            id:id
        }
    }).then(function (content) {
        if(content){
            req.content=content;
            next();
        }
        else{
            res.json({
                success:false,
                data:null,
                message:"no data found"
            });
        }
    }).catch(function (error) {
        res.json({
            success:false,
            data:null,
            message:"error"
        });
    });
}*/

module.exports = classobj;