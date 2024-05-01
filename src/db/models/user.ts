import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  zipCodeId?: number;
  CompanyId?:number[]

  createAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public last_name!: string;
  public email!: string;
  public phone!: string;
  public address!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    User.belongsToMany(models.Company, { through: models.CompanyUser });
    User.belongsToMany(models.Trade, { through: models.UserTrade });
    
    User.belongsTo(models.ZipCode);
    User.belongsTo(models.Payment)
  }
}

module.exports = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "User",
    }
  );
  return User;
};
