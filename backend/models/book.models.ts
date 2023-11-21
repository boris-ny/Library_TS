import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Genre from "./genre.models";
import Author from "./author.models";

class Book extends Model {
  public id!: number;
  public title!: string;
  public authorId!: number;
  public summary!: string;
  public isbn!: string;
  public genre_id!: number;

  public get url(): string {
    return `/catalog/book/${this.id}`;
  }
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: Author,
        key: "id",
      },
    },
    summary: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Genre,
        key: "id",
      },
    },
  },
  {
    tableName: "books",
    sequelize,
  }
  
);

Book.belongsTo(Author, { foreignKey: "authorId" });
Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Genre, { foreignKey: "genreId"});
Genre.hasMany(Book, { foreignKey: "genreId"});

export default Book;
