import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Genre extends Model {
  public id!: number;
  public name!: string;

  public get url(): string {
    return `/catalog/genre/${this.id}`;
  }
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "genres",
    sequelize,
  }
);


export default Genre;
