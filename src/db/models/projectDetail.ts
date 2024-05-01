import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ProjectAttributes {
  id: number;
  name: string;

  createAt?: Date;
  updatedAt?: Date;
}

export interface ProjectInput extends Optional<ProjectAttributes, "id"> {}
export interface ProjectOutput extends Required<ProjectAttributes> {}

class ProjectDetail
  extends Model<ProjectAttributes, ProjectInput>
  implements ProjectAttributes
{
  public id!: number;
  public name!: string;

  public readonly createAt?: Date;
  public readonly updatedAt?: Date;

  static associate(models: any) {
    ProjectDetail.hasMany(models.Trade);
  }
}

module.exports = (sequelize: Sequelize) => {
  ProjectDetail.init(
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
      underscored: true,
      timestamps: true,
      modelName: "ProjectDetail",
    }
  );
  return ProjectDetail;
};
