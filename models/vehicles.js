var moment = require('moment-timezone');
module.exports = function (sequelize, DataTypes) {
    var Vehicles = sequelize.define("vehicles", {
        vehicleName: DataTypes.STRING,
        vehicleModel:DataTypes.STRING
    });

    return Vehicles;
};