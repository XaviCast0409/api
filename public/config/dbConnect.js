"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db = {};
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dialect = "postgres";
const sequelize = new sequelize_1.default.Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dialect,
    logging: false,
    native: false,
});
/* const dbUrl = process.env.DB_URL;

const sequelize = new Sequelize.Sequelize(`${dbUrl}`, {
  logging: false,
  native: false,
});  */
const modelsDir = path_1.default.join(__dirname, '../db/models');
fs_1.default.readdirSync(modelsDir)
    .filter((file) => {
    return (file.indexOf(".") !== 0 && file.slice(-3) === ".ts");
})
    .forEach((file) => {
    const model = require(path_1.default.join(modelsDir, file))(sequelize, sequelize_1.default.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.default;
exports.default = db;
