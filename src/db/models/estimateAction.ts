import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface EstimateActionAttributes {
  id: number;
  name: string;

  createAt?: Date;
  updatedAt?: Date;
}

export interface EstimateActionInput
  extends Optional<EstimateActionAttributes, "id"> {}
export interface EstimateActionOutput
  extends Required<EstimateActionAttributes> {}

class EstimateAction
  extends Model<EstimateActionAttributes, EstimateActionInput>
  implements EstimateActionAttributes
{
  public id!: number;
  public name!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    EstimateAction.hasMany(models.Trade);
  }
}

module.exports = (sequelize: Sequelize) => {
  EstimateAction.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "EstimateAction",
    }
  );
  return EstimateAction;
};
