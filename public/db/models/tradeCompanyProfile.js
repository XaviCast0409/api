"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TradeCompanyProfile extends sequelize_1.Model {
}
module.exports = (sequelize) => {
    TradeCompanyProfile.init({
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
        CompanyId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "TradeCompanyProfile",
    });
    return TradeCompanyProfile;
};
