"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionLevel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
var PermissionLevel;
(function (PermissionLevel) {
    PermissionLevel[PermissionLevel["ADMIN"] = 1] = "ADMIN";
    PermissionLevel[PermissionLevel["USER"] = 2] = "USER";
    PermissionLevel[PermissionLevel["GUEST"] = 3] = "GUEST";
})(PermissionLevel || (exports.PermissionLevel = PermissionLevel = {}));
class User extends sequelize_1.Model {
    get url() {
        return `/catalog/user/${this.id}`;
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A",
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A",
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    permissionLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        //defaultValue: PermissionLevel.ADMIN,
    },
}, {
    sequelize: database_1.default,
    modelName: "User",
});
exports.default = User;
