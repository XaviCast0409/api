"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class EstimateAction extends sequelize_1.Model {
    static associate(models) {
        EstimateAction.hasMany(models.Trade);
    }
}
module.exports = (sequelize) => {
    EstimateAction.init({
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: "EstimateAction",
    });
    return EstimateAction;
};
