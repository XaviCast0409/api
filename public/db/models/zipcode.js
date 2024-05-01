"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ZipCode extends sequelize_1.Model {
    static associate(models) {
        ZipCode.hasMany(models.Company);
        ZipCode.hasMany(models.User);
    }
}
module.exports = (sequelize) => {
    ZipCode.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "ZipCode",
    });
    return ZipCode;
};
