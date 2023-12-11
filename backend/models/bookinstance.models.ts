import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { DateTime } from "luxon";
import Book from "./book.models";

class BookInstance extends Model {
  public id!: number;
  public book_id!: number;
  public imprint!: string;
  public status!: string;
  public due_back!: Date;

  public get url(): string {
    return `/catalog/bookinstance/${this.id}`;
  }

  public get due_back_formatted(): string {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
  }

  public get due_back_yyyy_mm_dd(): string | null {
    return this.due_back
      ? DateTime.fromJSDate(this.due_back).toISODate()
      : null; // format 'YYYY-MM-DD'
  }
}

BookInstance.init(
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
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "id",
      },
    },
    imprint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Available", "Maintenance", "Loaned", "Reserved"),
      allowNull: false,
      defaultValue: "Maintenance",
    },
    due_back: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "BookInstance",
  }
);

BookInstance.belongsTo(Book, { foreignKey: "book_id" });
Book.hasMany(BookInstance, { foreignKey: "book_id" });

export default BookInstance;
