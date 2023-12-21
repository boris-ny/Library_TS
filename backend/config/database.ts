import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

/**
 * Creates a new Sequelize instance with the provided database URL.
 * Initializes the Sequelize instance and logs a message to the console upon successful initialization.
 * @returns The initialized Sequelize instance.
 */
dotenv.config();

const databaseUrl = process.env.DB_URL;

if (!databaseUrl) {
	throw new Error('DB_URL is not defined');
}

const sequelize = new Sequelize(databaseUrl, {
	logging: false,
});
sequelize
	.sync({
		alter: true,
	})
	.then(() => {
		// eslint-disable-next-line no-console
		console.log('Sequelize initialized');
	})
	.catch((err: any) => {
		// eslint-disable-next-line no-console
		console.error('Sequelize Initialisation threw an error:', err);
	});

export default sequelize;
