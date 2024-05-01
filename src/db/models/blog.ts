import { Sequelize, Model, DataTypes, Optional } from "sequelize";

interface IBlog {
  id: number;
  title: string;
  content: string;
  publicationDate: Date;
  imageUrl?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlogInput extends Optional<IBlog, "id"> {}
export interface IBlogOutput extends Required<IBlog> {}

// Define el modelo del blog
class Blog 
  extends Model<IBlog, IBlogInput>
  implements IBlog {
  // Propiedades del modelo
  public id!: number;
  public title!: string;
  public content!: string;
  public publicationDate!: Date;
  public imageUrl!: string; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa el modelo del blog y exporta
module.exports = (sequelize: Sequelize) => {
  Blog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      publicationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Blog",
      timestamps: true,
      underscored: false,
    }
  );

  return Blog;
};
