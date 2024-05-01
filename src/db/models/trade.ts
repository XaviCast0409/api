import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface TradeAttributes {
  id: number;
  name: string;
  account: number;
  classIdArray?: [];

  createAt?: Date;
  updatedAt?: Date;
}

export interface TradeInput extends Optional<TradeAttributes, "id"> {}
export interface TradeOutput extends Required<TradeAttributes> {}

class Trade
  extends Model<TradeAttributes, TradeInput>
  implements TradeAttributes
{
  public id!: number;
  public name!: string;
  public account!: number;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    Trade.belongsToMany(models.Company, { through: models.CompanyTrade });
    Trade.belongsToMany(models.User, { through: models.UserTrade });
    Trade.belongsToMany(models.Class, { through: models.ClassTrade })

    Trade.belongsTo(models.EstimateAction)
    Trade.belongsTo(models.ProjectDetail)
  }
}

module.exports = (sequelize: Sequelize) => {
  Trade.init(
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
      account: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "Trade",
    }
  );
  return Trade;
};
