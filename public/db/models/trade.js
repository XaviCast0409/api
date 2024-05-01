"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Trade extends sequelize_1.Model {
    static associate(models) {
        Trade.belongsToMany(models.Company, { through: models.CompanyTrade });
        Trade.belongsToMany(models.User, { through: models.UserTrade });
        Trade.belongsToMany(models.Class, { through: models.ClassTrade });
        Trade.belongsTo(models.EstimateAction);
        Trade.belongsTo(models.ProjectDetail);
    }
}
module.exports = (sequelize) => {
    Trade.init({
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
        account: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Trade",
    });
    return Trade;
};
