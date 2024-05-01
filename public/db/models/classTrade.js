"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ClassTrade extends sequelize_1.Model {
}
module.exports = (sequelize) => {
    ClassTrade.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        ClassId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        TradeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "ClassTrade",
    });
    return ClassTrade;
};
