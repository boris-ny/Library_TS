import { Sequelize } from "sequelize";

import dotenv from "dotenv";

/**
 * Creates a new Sequelize instance with the provided database URL.
 * Initializes the Sequelize instance and logs a message to the console upon successful initialization.
 * @returns The initialized Sequelize instance.
 */
dotenv.config();

const sequelize = new Sequelize(
  "postgres://postgres:admin@123@localhost:5432/project_0",
  {
    logging: false,
  }
);

sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("Sequelize initialized");
  })
  .catch((err: any) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });

export default sequelize;
