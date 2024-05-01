import { Model, Optional, Sequelize, DataTypes } from "sequelize";
interface ClassAttributes {
  id: number;
  name: string;

  createAt?: Date;
  updatedAt?: Date;
}

export interface ClassInput extends Optional<ClassAttributes, "id"> {}
export interface ClassOutput extends Required<ClassAttributes> {}


class Class
  extends Model<ClassAttributes, ClassInput>
  implements ClassAttributes
{
  public id!: number;
  public name!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    Class.belongsToMany(models.Trade, { through: models.ClassTrade })
    Class.belongsToMany(models.TradeCompanyUser, { through: models.TradeClassCompanyUser })
  }
}

module.exports = (sequelize: Sequelize) => {
  Class.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "Class",
    }
  )
  return Class
}