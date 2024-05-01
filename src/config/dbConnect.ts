import Sequelize from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const db: any = {};

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dialect = "postgres";

const sequelize = new Sequelize.Sequelize(dbName, dbUsername, dbPassword, {
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

const modelsDir = path.join(__dirname, '../db/models');
fs.readdirSync(modelsDir)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 && file.slice(-3) === ".ts"
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(modelsDir, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;