"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class CompanyUser extends sequelize_1.Model {
}
module.exports = (sequelize) => {
    CompanyUser.init({
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        UserId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        CompanyId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "CompanyUser",
    });
    return CompanyUser;
};
