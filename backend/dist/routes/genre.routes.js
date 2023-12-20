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
Object.defineProperty(exports, '__esModule', { value: true });
const genreController = __importStar(require('../controllers/genreController'));
const express_1 = require('express');
const authcontroller = __importStar(require('../controllers/authController'));
const user_models_1 = require('../models/user.models');
/**
 * Router for handling genre related requests.
 */
const router = (0, express_1.Router)();
router
	.route('/')
	/**
	 * Middleware to validate JWT token and check user permission level.
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
	 * Route handler for getting all genres.
	 */
	.get(genreController.getAllGenres)
	/**
	 * Route handler for creating a new genre.
	 */
	.post(
		authcontroller.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
		]),
		genreController.genreValidation,
		genreController.createGenre
	);
router
	.route('/:genreId')
	/**
	 * Middleware to validate JWT token and check user permission level.
	 */
	.all(
		authcontroller.validJWTNeeded,
		authcontroller.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
			user_models_1.PermissionLevel.USER,
		])
	)
	/**
	 * Route handler for getting a genre by ID.
	 */
	.get(genreController.getGenreById)
	/**
	 * Route handler for updating a genre.
	 */
	.put(genreController.genreValidation, genreController.updateGenre)
	/**
	 * Route handler for deleting a genre.
	 * Requires admin permission level.
	 */
	.delete(
		authcontroller.permissionLevelRequired([
			user_models_1.PermissionLevel.ADMIN,
		]),
		genreController.deleteGenre
	);
exports.default = router;
