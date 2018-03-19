var moment = require('moment-timezone');
module.exports = function (sequelize, DataTypes) {
    var Properties = sequelize.define("properties", {
        propertyName: DataTypes.STRING,
        propertyPlace: DataTypes.STRING

    });

    return Properties;
};