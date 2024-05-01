"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ProjectDetail extends sequelize_1.Model {
    static associate(models) {
        ProjectDetail.hasMany(models.Trade);
    }
}
module.exports = (sequelize) => {
    ProjectDetail.init({
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
        underscored: true,
        timestamps: true,
        modelName: "ProjectDetail",
    });
    return ProjectDetail;
};
