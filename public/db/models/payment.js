"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Payment extends sequelize_1.Model {
    static associate(models) {
        Payment.hasMany(models.User);
    }
}
module.exports = (sequelize) => {
    Payment.init({
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Payment",
    });
    return Payment;
};
