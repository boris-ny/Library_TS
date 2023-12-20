'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const database_1 = __importDefault(require('../config/database'));
const genre_models_1 = __importDefault(require('./genre.models'));
const author_models_1 = __importDefault(require('./author.models'));
class Book extends sequelize_1.Model {
	get url() {
		return `/catalog/book/${this.id}`;
	}
}
Book.init(
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
		authorId: {
			type: sequelize_1.DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: author_models_1.default,
				key: 'id',
			},
		},
		summary: {
			type: sequelize_1.DataTypes.STRING(),
			allowNull: false,
		},
		isbn: {
			type: sequelize_1.DataTypes.STRING(13),
			allowNull: false,
		},
		genreId: {
			type: sequelize_1.DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: genre_models_1.default,
				key: 'id',
			},
		},
	},
	{
		tableName: 'books',
		sequelize: database_1.default,
	}
);
Book.belongsTo(author_models_1.default, { foreignKey: 'authorId' });
author_models_1.default.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(genre_models_1.default, { foreignKey: 'genreId' });
exports.default = Book;
