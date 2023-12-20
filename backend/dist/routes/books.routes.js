'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (
					!desc ||
					('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
				) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						},
					};
				}
				Object.defineProperty(o, k2, desc);
			}
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
			});
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', { enumerable: true, value: v });
			}
		: function (o, v) {
				o['default'] = v;
			});
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const bookcontroller = __importStar(require('../controllers/bookController'));
const authcontroller = __importStar(require('../controllers/authController'));
const user_models_1 = require('../models/user.models');
/**
 * Router for handling book-related requests.
 */
const router = (0, express_1.default)();
router
	.route('/')
	/**
	 * Middleware to ensure that a valid JWT is provided.
	 * Middleware to ensure that the user has the required permission level.
	 */
	.all(
		authcontroller.validJWTNeeded,
		authcontroller.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
			user_models_1.PermissionLevel.USER,
			user_models_1.PermissionLevel.GUEST,
		])
	)
	/**
	 * Handler for GET requests to retrieve all books.
	 */
	.get(bookcontroller.getAllBooks)
	/**
	 * Handler for POST requests to create a new book.
	 * Middleware to ensure that the user has the required permission level.
	 * Middleware to validate the book data.
	 */
	.post(
		authcontroller.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
			user_models_1.PermissionLevel.USER,
		]),
		bookcontroller.BookValidation,
		bookcontroller.postBookCreate
	);
router
	.route('/:bookId')
	/**
	 * Middleware to ensure that a valid JWT is provided.
	 * Middleware to ensure that the user has the required permission level.
	 */
	.all(
		authcontroller.validJWTNeeded,
		authcontroller.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
			user_models_1.PermissionLevel.USER,
		])
	)
	/**
	 * Handler for GET requests to retrieve a specific book by ID.
	 */
	.get(bookcontroller.getBookById)
	/**
	 * Handler for PUT requests to update a specific book by ID.
	 * Middleware to validate the book data.
	 * Middleware to ensure that the user has the required permission level.
	 */
	.put(bookcontroller.BookValidation, bookcontroller.postBookUpdate)
	/**
	 * Handler for DELETE requests to delete a specific book by ID.
	 * Middleware to delete the book data.
	 * Middleware to ensure that the user has the required permission level.
	 */
	.delete(
		bookcontroller.BookDelete,
		authcontroller.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
		])
	);
exports.default = router;
