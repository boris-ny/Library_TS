"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.UserValidation = exports.getUserById = exports.getAllUsers = void 0;
const celebrate_1 = require("celebrate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = __importDefault(require("../models/user.models"));
// GET /users
const getAllUsers = async (_req, res) => {
    try {
        const users = await user_models_1.default.findAll({});
        return res.json({
            status: 200,
            message: "success",
            data: users,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Users Error" });
    }
};
exports.getAllUsers = getAllUsers;
// GET /users/:id
const getUserById = async (req, res) => {
    try {
        const user = await user_models_1.default.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
        return res.json({
            status: 200,
            message: `User ${req.params.userId} found`,
            data: user,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Users Error" });
    }
};
exports.getUserById = getUserById;
// User Validation
const userSchema = celebrate_1.Joi.object({
    firstName: celebrate_1.Joi.string().required(),
    lastName: celebrate_1.Joi.string().required(),
    email: celebrate_1.Joi.string().email().required(),
    permissionLevel: celebrate_1.Joi.number().required(),
    password: celebrate_1.Joi.string().required(),
});
exports.UserValidation = (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: userSchema });
// POST /users
const createUser = async (req, res) => {
    try {
        const existingUser = user_models_1.default.findOne({ where: { email: req.body.email } });
        if (existingUser == req.body.email) {
            return res.status(400).json({ error: "User already exists" });
        }
        if (req.body.password) {
            const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
            // Replace the plain text password with the hashed password
            req.body.password = hashedPassword;
        }
        const user = await user_models_1.default.create(req.body);
        return res.json({
            status: 200,
            message: "User Created",
            data: user,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Users Error" });
    }
};
exports.createUser = createUser;
// Update User
const updateUser = async (req, res) => {
    try {
        const user = await user_models_1.default.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
        //console.log(user);
        if (req.body.password) {
            // Hash the new password
            const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
            // Replace the plain text password with the hashed password
            req.body.password = hashedPassword;
        }
        await user.update(req.body);
        return res.json({
            status: 200,
            message: `User ${req.params.userId} updated`,
            data: user,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Users Error" });
    }
};
exports.updateUser = updateUser;
// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await user_models_1.default.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
        await user.destroy();
        return res.json({
            status: 200,
            message: `User ${req.params.userId} deleted`,
            data: user,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Users Error" });
    }
};
exports.deleteUser = deleteUser;
