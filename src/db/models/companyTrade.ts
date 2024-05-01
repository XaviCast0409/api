import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface CompanyTradeAttributes {
  id: number;
  CompanyId: number;
  TradeId: number;

  createAt?: Date;
  updatedAt?: Date;
}

export interface CompanyTradeInput
  extends Optional<CompanyTradeAttributes, "id"> {}
export interface CompanyTradeOutput extends Required<CompanyTradeAttributes> {}

class CompanyTrade
  extends Model<CompanyTradeAttributes, CompanyTradeInput>
  implements CompanyTradeAttributes
{
  public id!: number;
  public CompanyId!: number;
  public TradeId!: number;

  public readonly createAt!: Date;
  public readonly updatedAt!: Date;
}

module.exports = (sequelize: Sequelize) => {
  CompanyTrade.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      CompanyId: {
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
      modelName: "CompanyTrade",
    }
  );
  return CompanyTrade;
};
