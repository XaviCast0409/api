"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Company extends sequelize_1.Model {
    static associate(models) {
        /* asignaciones de la compañia para el admin */
        Company.belongsToMany(models.Trade, { through: models.CompanyTrade });
        /* asignaciones de la compañia para el usuario-Compania */
        Company.belongsToMany(models.User, { through: models.CompanyUser });
        Company.belongsToMany(models.TradeCompanyUser, { through: models.TradeCompanyProfile });
        Company.belongsTo(models.ZipCode);
        Company.belongsTo(models.Token);
    }
}
module.exports = (sequelize) => {
    Company.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        name_company: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        customerstripeId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isAdmin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        ZipCodeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Company",
    });
    return Company;
};
