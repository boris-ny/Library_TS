import Router from 'express';
import * as authorController from '../controllers/authorController';
import * as authController from '../controllers/authController';
import { PermissionLevel } from '../models/user.models';

/**
 * Router for handling author-related requests.
 */
const router = Router();

router;
router
	.route('/')
	/**
	 * Middleware for validating JWT and permission level.
	 */
	.all(
		authController.validJWTNeeded,
		authController.permissionLevelRequired([
			PermissionLevel.ADMIN,
			PermissionLevel.USER,
			PermissionLevel.GUEST,
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
			PermissionLevel.ADMIN,
			PermissionLevel.USER,
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
			PermissionLevel.ADMIN,
			PermissionLevel.USER,
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
		authController.permissionLevelRequired([PermissionLevel.ADMIN])
	);

export default router;
