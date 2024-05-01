import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface UserTradeAttributes {
  id: number;
  UserId: number;
  TradeId: number;

  createAt?: Date;
  updatedAt?: Date;
}

export interface UserTradeInput extends Optional<UserTradeAttributes, "id"> {}
export interface UserTradeOutput extends Required<UserTradeAttributes> {}

class UserTrade
  extends Model<UserTradeAttributes, UserTradeInput>
  implements UserTradeAttributes
{
  public id!: number;
  public UserId!: number;
  public TradeId!: number;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;
}

module.exports = (sequelize: Sequelize) => {
  UserTrade.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TradeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "UserTrade",
    }
  );
  return UserTrade;
};
