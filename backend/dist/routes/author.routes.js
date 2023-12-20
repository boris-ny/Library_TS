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
const authorController = __importStar(
	require('../controllers/authorController')
);
const authController = __importStar(require('../controllers/authController'));
const user_models_1 = require('../models/user.models');
/**
 * Router for handling author-related requests.
 */
const router = (0, express_1.default)();
router;
router
	.route('/')
	/**
	 * Middleware for validating JWT and permission level.
	 */
	.all(
		authController.validJWTNeeded,
		authController.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
			user_models_1.PermissionLevel.USER,
			user_models_1.PermissionLevel.GUEST,
		])
	)
	/**
	 * Route for getting all authors.
	 */
	.get(authorController.getAllAuthors)
	/**
	 * Route for creating a new author.
	 */
	.post(
		authController.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
			user_models_1.PermissionLevel.USER,
		]),
		/**
		 * Middleware for validating author data.
		 */
		authorController.authorValidation,
		authorController.createAuthor
	);
router
	.route('/:authorId')
	/**
	 * Middleware for validating JWT and permission level.
	 */
	.all(
		authController.validJWTNeeded,
		authController.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
			user_models_1.PermissionLevel.USER,
		])
	)
	/**
	 * Route for getting an author by ID.
	 */
	.get(authorController.getAuthorById)
	/**
	 * Route for updating an author.
	 */
	.put(
		/**
		 * Middleware for validating author data.
		 */
		authorController.authorValidation,
		authorController.updateAuthor
	)
	/**
	 * Route for deleting an author.
	 */
	.delete(
		authorController.deleteAuthor,
		/**
		 * Middleware for requiring admin permission level.
		 */
		authController.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
		])
	);
exports.default = router;
