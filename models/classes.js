var moment = require('moment-timezone');
module.exports = function (sequelize, DataTypes) {
    var Classes = sequelize.define("classes", {
        class: DataTypes.STRING

    },{
        classMethods: {
            associate: function (models) {
                Classes.belongsTo(models.students);
            }
        }

    });

    return Classes;
};