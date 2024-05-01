import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface TokenAttributes {
  id: number;
  token: string;

  createAt?: Date;
  updatedAt?: Date;
}

export interface TokenInput extends Optional<TokenAttributes, "id"> {}
export interface TokenOutput extends Required<TokenAttributes> {}

class Token
  extends Model<TokenAttributes, TokenInput>
  implements TokenAttributes
{
  public id!: number;
  public token!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any){
    Token.hasMany(models.Company)
  }
}

module.exports = (sequelize: Sequelize) => {
  Token.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: true,
      modelName: "Token",
    }
  );
  return Token;
};
