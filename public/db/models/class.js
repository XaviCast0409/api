"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Class extends sequelize_1.Model {
    static associate(models) {
        Class.belongsToMany(models.Trade, { through: models.ClassTrade });
        Class.belongsToMany(models.TradeCompanyUser, { through: models.TradeClassCompanyUser });
    }
}
module.exports = (sequelize) => {
    Class.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Class",
    });
    return Class;
};
