import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface TradeCompanyProfileAttributes {
  id: number;
  TradeCompanyUserId: number;
  CompanyId: number;
  createAt?: Date;
  updatedAt?: Date;
}

export interface TradeCompanyProfileInput
  extends Optional<TradeCompanyProfileAttributes, "id"> {}
export interface TradeCompnayProfileOutput
  extends Required<TradeCompanyProfileAttributes> {}

class TradeCompanyProfile
  extends Model<TradeCompanyProfileAttributes, TradeCompanyProfileInput>
  implements TradeCompanyProfileAttributes
{
  public id!: number;
  public TradeCompanyUserId!: number;
  public CompanyId!: number;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;
}

module.exports = (sequelize: Sequelize) => {
  TradeCompanyProfile.init(
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
      CompanyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "TradeCompanyProfile",
    }
  );
  return TradeCompanyProfile;
};
