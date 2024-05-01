"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class CompanyTrade extends sequelize_1.Model {
}
module.exports = (sequelize) => {
    CompanyTrade.init({
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        CompanyId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        TradeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "CompanyTrade",
    });
    return CompanyTrade;
};
