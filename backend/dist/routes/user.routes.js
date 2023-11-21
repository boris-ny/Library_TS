"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller = __importStar(require("../controllers/userController"));
const authcontroller = __importStar(require("../controllers/authController"));
const user_models_1 = require("../models/user.models");
/**
 * Router for handling user-related requests.
 */
const router = (0, express_1.default)();
router
    .route("/")
    /**
     * Middleware to validate JWT token and check user's permission level.
     */
    .all(authcontroller.validJWTNeeded, authcontroller.permissionLevelRequired([
    user_models_1.PermissionLevel.ADMIN,
    user_models_1.PermissionLevel.USER,
]))
    /**
     * Route handler to get all users.
     */
    .get(usercontroller.getAllUsers)
    /**
     * Route handler to create a new user.
     */
    .post(usercontroller.UserValidation, usercontroller.createUser);
router
    .route("/:userId")
    /**
     * Middleware to validate JWT token and check user's permission level.
     */
    .all(authcontroller.validJWTNeeded, authcontroller.permissionLevelRequired([user_models_1.PermissionLevel.ADMIN]))
    /**
     * Route handler to get a user by ID.
     */
    .get(usercontroller.getUserById)
    /**
     * Route handler to update a user.
     */
    .put(usercontroller.UserValidation, usercontroller.updateUser)
    /**
     * Route handler to delete a user.
     */
    .delete(usercontroller.deleteUser);
exports.default = router;
