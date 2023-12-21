/* eslint-disable no-unused-vars */
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export enum PermissionLevel {
	ADMIN = 1,
	USER = 2,
	GUEST = 3,
}

class User extends Model {
	public id!: number;
	public firstName!: string;
	public lastName!: string;
	public password!: string;
	public email!: string;
	public permissionLevel!: number;

	public get url(): string {
		return `/catalog/user/${this.id}`;
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'N/A',
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'N/A',
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		permissionLevel: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: PermissionLevel.USER,
		},
	},
	{
		sequelize,
		modelName: 'User',
	}
);

export default User;
