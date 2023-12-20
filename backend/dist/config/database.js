'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const dotenv_1 = __importDefault(require('dotenv'));
/**
 * Creates a new Sequelize instance with the provided database URL.
 * Initializes the Sequelize instance and logs a message to the console upon successful initialization.
 * @returns The initialized Sequelize instance.
 */
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(
	'postgres://postgres:admin@123@localhost:5432/project_0'
);
sequelize
	.sync({
		alter: true,
	})
	.then(() => {
		console.log('Sequelize initialized');
	})
	.catch((err) => {
		console.error('Sequelize Initialisation threw an error:', err);
	});
exports.default = sequelize;
