import { Model, Optional, Sequelize, DataTypes } from "sequelize";
interface ClassTradeAttributes {
  id: number;
  ClassId: number;
  TradeId: number;

  createAt?: Date;
  updatedAt?: Date;
}

export interface ClassTradeInput extends Optional<ClassTradeAttributes, "id"> {}
export interface ClassTradeOutput extends Required<ClassTradeAttributes> {}


class ClassTrade
  extends Model<ClassTradeAttributes, ClassTradeInput>
  implements ClassTradeAttributes
{
  public id!: number;
  public ClassId!: number;
  public TradeId!: number;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

}

module.exports = (sequelize: Sequelize) => {
  ClassTrade.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      TradeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "ClassTrade",
    }
  )
  return ClassTrade
}