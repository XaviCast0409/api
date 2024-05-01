import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface TradeClassCompanyUserAttributes {
  id: number;
  ClassId: number;
  TradeCompanyUserId: number;
  createAt?: Date;
  updatedAt?: Date;
}

export interface TradeClassCompanyUserInput
  extends Optional<TradeClassCompanyUserAttributes, "id"> {}
export interface TradeClassCompnayUsereOutput
  extends Required<TradeClassCompanyUserAttributes> {}

class TradeClassCompanyUser
  extends Model<TradeClassCompanyUserAttributes, TradeClassCompanyUserInput>
  implements TradeClassCompanyUserAttributes
{
  public id!: number;
  public ClassId!: number;
  public TradeCompanyUserId!: number;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;
}

module.exports = (sequelize: Sequelize) => {
  TradeClassCompanyUser.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      TradeCompanyUserId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ClassId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "TradeClassCompanyUser",
    }
  );
  return TradeClassCompanyUser;
};
