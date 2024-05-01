"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Token extends sequelize_1.Model {
    static associate(models) {
        Token.hasMany(models.Company);
    }
}
module.exports = (sequelize) => {
    Token.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Token",
    });
    return Token;
};
