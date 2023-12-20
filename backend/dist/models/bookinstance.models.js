'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const database_1 = __importDefault(require('../config/database'));
const luxon_1 = require('luxon');
const book_models_1 = __importDefault(require('./book.models'));
class BookInstance extends sequelize_1.Model {
	get url() {
		return `/catalog/bookinstance/${this.id}`;
	}
	get due_back_formatted() {
		return luxon_1.DateTime.fromJSDate(this.due_back).toLocaleString(
			luxon_1.DateTime.DATE_MED
		);
	}
	get due_back_yyyy_mm_dd() {
		return this.due_back
			? luxon_1.DateTime.fromJSDate(this.due_back).toISODate()
			: null; // format 'YYYY-MM-DD'
	}
}
BookInstance.init(
	{
		id: {
			type: sequelize_1.DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: sequelize_1.DataTypes.STRING(255),
			allowNull: false,
		},
		book_id: {
			type: sequelize_1.DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: book_models_1.default,
				key: 'id',
			},
		},
		imprint: {
			type: sequelize_1.DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: sequelize_1.DataTypes.ENUM(
				'Available',
				'Maintenance',
				'Loaned',
				'Reserved'
			),
			allowNull: false,
			defaultValue: 'Maintenance',
		},
		due_back: {
			type: sequelize_1.DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: sequelize_1.DataTypes.NOW,
		},
	},
	{
		sequelize: database_1.default,
		modelName: 'BookInstance',
	}
);
BookInstance.belongsTo(book_models_1.default, { foreignKey: 'book_id' });
exports.default = BookInstance;
