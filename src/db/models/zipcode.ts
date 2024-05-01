import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ZipCodeAttributes {
  id: number;
  city: string;
  code: number;
  state: string;

  createAt?: Date;
  updatedAt?: Date;
}

export interface ZipCodeInput extends Optional<ZipCodeAttributes, "id"> {}
export interface ZipCodeOutput extends Required<ZipCodeAttributes> {}

class ZipCode
  extends Model<ZipCodeAttributes, ZipCodeInput>
  implements ZipCodeAttributes
{
  public id!: number;
  public city!: string;
  public code!: number;
  public state!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    ZipCode.hasMany(models.Company);
    ZipCode.hasMany(models.User);
  }
}

module.exports = (sequelize: Sequelize) => {
  ZipCode.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "ZipCode",
    }
  );

  return ZipCode;
};
