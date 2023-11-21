import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { DateTime } from "luxon";
import Book from "./book.models";

class Author extends Model {
  public id!: number;
  public first_name!: string;
  public family_name!: string;
  public date_of_birth!: Date | null;
  public date_of_death!: Date | null;

  public get name(): string {
    return `${this.family_name}, ${this.first_name}`;
  }

  public get url(): string {
    return `/catalog/author/${this.id}`;
  }

  public get lifespan(): string {
    let lifetime_string = "";
    if (this.date_of_birth) {
      lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED
      );
    }
    lifetime_string += " - ";
    if (this.date_of_death) {
      lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
        DateTime.DATE_MED
      );
    }
    return lifetime_string;
  }

  public get date_of_birth_yyyy_mm_dd(): string | null {
    return this.date_of_birth
      ? DateTime.fromJSDate(this.date_of_birth).toISODate()
      : null;
  }

  public get date_of_death_yyyy_mm_dd(): string | null {
    return this.date_of_death
      ? DateTime.fromJSDate(this.date_of_death).toISODate()
      : null;
  }
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    family_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    date_of_death: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Author",
  }
);




export default Author;
