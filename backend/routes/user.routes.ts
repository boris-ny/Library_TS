import Router from "express";

import * as usercontroller from "../controllers/userController";
import * as authcontroller from "../controllers/authController";
import { PermissionLevel } from "../models/user.models";

/**
 * Router for handling user-related requests.
 */
const router = Router();

router
  .route("/")
  .get(
    authcontroller.validJWTNeeded,
    authcontroller.permissionLevelRequired([
      PermissionLevel.ADMIN,
      PermissionLevel.USER,
    ]),
    usercontroller.getAllUsers
  )
  /**
   * Route handler to create a new user.
   */
  .post(usercontroller.UserValidation, usercontroller.createUser);

router
  .route("/:userId")
  /**
   * Middleware to validate JWT token and check user's permission level.
   */
  .all(
    authcontroller.validJWTNeeded,
    authcontroller.permissionLevelRequired([PermissionLevel.ADMIN, PermissionLevel.USER])
  )
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

export default router;
