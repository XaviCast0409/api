"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TradeCompanyUser extends sequelize_1.Model {
    static associate(models) {
        TradeCompanyUser.belongsToMany(models.Company, { through: models.TradeCompanyProfile });
        TradeCompanyUser.belongsToMany(models.Class, { through: models.TradeClassCompanyUser });
    }
}
module.exports = (sequelize) => {
    TradeCompanyUser.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "TradeCompanyUser",
    });
    return TradeCompanyUser;
};
