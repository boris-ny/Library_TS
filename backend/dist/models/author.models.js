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
class Author extends sequelize_1.Model {
	get name() {
		return `${this.family_name}, ${this.first_name}`;
	}
	get url() {
		return `/catalog/author/${this.id}`;
	}
	get lifespan() {
		let lifetime_string = '';
		if (this.date_of_birth) {
			lifetime_string = luxon_1.DateTime.fromJSDate(
				this.date_of_birth
			).toLocaleString(luxon_1.DateTime.DATE_MED);
		}
		lifetime_string += ' - ';
		if (this.date_of_death) {
			lifetime_string += luxon_1.DateTime.fromJSDate(
				this.date_of_death
			).toLocaleString(luxon_1.DateTime.DATE_MED);
		}
		return lifetime_string;
	}
	get date_of_birth_yyyy_mm_dd() {
		return this.date_of_birth
			? luxon_1.DateTime.fromJSDate(this.date_of_birth).toISODate()
			: null;
	}
	get date_of_death_yyyy_mm_dd() {
		return this.date_of_death
			? luxon_1.DateTime.fromJSDate(this.date_of_death).toISODate()
			: null;
	}
}
Author.init(
	{
		id: {
			type: sequelize_1.DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		first_name: {
			type: sequelize_1.DataTypes.STRING(255),
			allowNull: false,
		},
		family_name: {
			type: sequelize_1.DataTypes.STRING(255),
			allowNull: false,
		},
		date_of_birth: {
			type: sequelize_1.DataTypes.DATEONLY,
			allowNull: true,
		},
		date_of_death: {
			type: sequelize_1.DataTypes.DATEONLY,
			allowNull: true,
		},
	},
	{
		sequelize: database_1.default,
		modelName: 'Author',
	}
);
exports.default = Author;
