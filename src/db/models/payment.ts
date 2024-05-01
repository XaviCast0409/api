import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface PaymentAttributes {
  id: number;
  status: string;

  createAt?: Date;
  updatedAt?: Date;
}

export interface PaymentInput extends Optional<PaymentAttributes, "id"> {}
export interface PaymentOutput extends Required<PaymentAttributes> {}

class Payment
  extends Model<PaymentAttributes, PaymentInput>
  implements PaymentAttributes
{
  public id!: number;
  public status!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    Payment.hasMany(models.User)
  }
}

module.exports = (sequelize: Sequelize) => {
  Payment.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "Payment",
    }
  );
  return Payment;
};
