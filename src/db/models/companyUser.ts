import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface CompanyUserAttributes {
  id: number;
  UserId: number;
  CompanyId: number;

  createAt?: Date;
  updatedAt?: Date;
}

export interface CompanyUserInput
  extends Optional<CompanyUserAttributes, "id"> {}
export interface CompanyUserOutput extends Required<CompanyUserAttributes> {}

class CompanyUser
  extends Model<CompanyUserAttributes, CompanyUserInput>
  implements CompanyUserAttributes
{
  public id!: number;
  public UserId!: number;
  public CompanyId!: number;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;
}

module.exports = (sequelize: Sequelize) => {
  CompanyUser.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CompanyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "CompanyUser",
    }
  );
  return CompanyUser;
};
