"use strict";
/**
 * Router for handling book instance related requests.
 * @module bookInstanceRoutes
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
const bookinstanceController = __importStar(require("../controllers/bookinstanceController"));
const authcontroller = __importStar(require("../controllers/authController"));
const express_1 = require("express");
const user_models_1 = require("../models/user.models");
const router = (0, express_1.Router)();
router
    .route("/")
    /**
     * Middleware to validate JWT token and check user permission level.
     * @function
     * @name authcontroller.validJWTNeeded
     * @middleware
     */
    .all(authcontroller.validJWTNeeded, authcontroller.permissionLevelRequired([
    user_models_1.PermissionLevel.ADMIN,
    user_models_1.PermissionLevel.USER,
    user_models_1.PermissionLevel.GUEST,
]))
    /**
     * Route for getting all book instances.
     * @function
     * @name bookinstanceController.getAllBookInstances
     * @returns {Array} Array of book instances.
     */
    .get(bookinstanceController.getAllBookInstances)
    /**
     * Route for creating a new book instance.
     * @function
     * @name bookinstanceController.createBookInstance
     * @returns {Object} The created book instance.
     */
    .post(bookinstanceController.bookinstanceValidation, bookinstanceController.createBookInstance, authcontroller.permissionLevelRequired([
    user_models_1.PermissionLevel.ADMIN,
    user_models_1.PermissionLevel.USER,
]));
router
    .route("/:bookinstanceId")
    /**
     * Middleware to validate JWT token and check user permission level.
     * @function
     * @name authcontroller.validJWTNeeded
     * @middleware
     */
    .all(authcontroller.validJWTNeeded, authcontroller.permissionLevelRequired([
    user_models_1.PermissionLevel.ADMIN,
    user_models_1.PermissionLevel.USER,
]))
    /**
     * Route for getting a book instance by ID.
     * @function
     * @name bookinstanceController.getBookInstanceById
     * @returns {Object} The book instance with the given ID.
     */
    .get(bookinstanceController.getBookInstanceById)
    /**
     * Route for deleting a book instance by ID.
     * @function
     * @name bookinstanceController.deleteBookInstance
     * @returns {Object} The deleted book instance.
     */
    .delete(authcontroller.permissionLevelRequired([user_models_1.PermissionLevel.ADMIN]), bookinstanceController.deleteBookInstance)
    /**
     * Route for updating a book instance by ID.
     * @function
     * @name bookinstanceController.updateBookInstance
     * @returns {Object} The updated book instance.
     */
    .put(bookinstanceController.bookinstanceValidation, bookinstanceController.updateBookInstance);
exports.default = router;
