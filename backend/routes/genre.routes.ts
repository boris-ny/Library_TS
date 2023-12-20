import * as genreController from '../controllers/genreController';
import { Router } from 'express';
import * as authcontroller from '../controllers/authController';
import { PermissionLevel } from '../models/user.models';

/**
 * Router for handling genre related requests.
 */
const router = Router();

router
	.route('/')
	/**
	 * Middleware to validate JWT token and check user permission level.
	 */
	.all(
		authcontroller.validJWTNeeded,
		authcontroller.permissionLevelRequired([
			PermissionLevel.ADMIN,
			PermissionLevel.USER,
			PermissionLevel.GUEST,
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
		authcontroller.permissionLevelRequired([PermissionLevel.ADMIN]),
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
			PermissionLevel.ADMIN,
			PermissionLevel.USER,
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
		authcontroller.permissionLevelRequired([PermissionLevel.ADMIN]),
		genreController.deleteGenre
	);

export default router;
