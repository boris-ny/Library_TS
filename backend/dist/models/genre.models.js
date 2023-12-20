'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const database_1 = __importDefault(require('../config/database'));
class Genre extends sequelize_1.Model {
	get url() {
		return `/catalog/genre/${this.id}`;
	}
}
Genre.init(
	{
		id: {
			type: sequelize_1.DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: sequelize_1.DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		tableName: 'genres',
		sequelize: database_1.default,
	}
);
exports.default = Genre;
