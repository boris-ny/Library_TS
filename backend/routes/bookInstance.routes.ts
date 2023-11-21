/**
 * Router for handling book instance related requests.
 * @module bookInstanceRoutes
 */

import * as bookinstanceController from "../controllers/bookinstanceController";
import * as authcontroller from "../controllers/authController";
import { Router } from "express";
import { PermissionLevel } from "../models/user.models";

const router = Router();

router
  .route("/")
  /**
   * Middleware to validate JWT token and check user permission level.
   * @function
   * @name authcontroller.validJWTNeeded
   * @middleware
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
  .post(
    bookinstanceController.bookinstanceValidation,
    bookinstanceController.createBookInstance,
    authcontroller.permissionLevelRequired([
      PermissionLevel.ADMIN,
      PermissionLevel.USER,
    ])
  );

router
  .route("/:bookinstanceId")
  /**
   * Middleware to validate JWT token and check user permission level.
   * @function
   * @name authcontroller.validJWTNeeded
   * @middleware
   */
  .all(
    authcontroller.validJWTNeeded,
    authcontroller.permissionLevelRequired([
      PermissionLevel.ADMIN,
      PermissionLevel.USER,
    ])
  )
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
  .delete(
    authcontroller.permissionLevelRequired([PermissionLevel.ADMIN]),
    bookinstanceController.deleteBookInstance
  )
  /**
   * Route for updating a book instance by ID.
   * @function
   * @name bookinstanceController.updateBookInstance
   * @returns {Object} The updated book instance.
   */
  .put(
    bookinstanceController.bookinstanceValidation,
    bookinstanceController.updateBookInstance
  );

export default router;
