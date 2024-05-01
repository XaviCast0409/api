"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TradeClassCompanyUser extends sequelize_1.Model {
}
module.exports = (sequelize) => {
    TradeClassCompanyUser.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        TradeCompanyUserId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ClassId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "TradeClassCompanyUser",
    });
    return TradeClassCompanyUser;
};
