import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface TradeCompanyUserAttributes {
  id: number;
  name: string;

  createAt?: Date;
  updatedAt?: Date;
}

export interface TradeCompanyUserInput
  extends Optional<TradeCompanyUserAttributes, "id"> {}
export interface TradeCompanyUsereOutput
  extends Required<TradeCompanyUserAttributes> {}

class TradeCompanyUser
  extends Model<TradeCompanyUserAttributes, TradeCompanyUserInput>
  implements TradeCompanyUserAttributes
{
  public id!: number;
  public name!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    TradeCompanyUser.belongsToMany(models.Company, { through: models.TradeCompanyProfile });
    TradeCompanyUser.belongsToMany(models.Class, { through: models.TradeClassCompanyUser });
  }
}

module.exports = (sequelize: Sequelize) => {
  TradeCompanyUser.init(
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
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "TradeCompanyUser",
    }
  );
  return TradeCompanyUser;
};
