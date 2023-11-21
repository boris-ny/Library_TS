import Router from "express";
import * as bookcontroller from "../controllers/bookController";
import * as authcontroller from "../controllers/authController";
import { PermissionLevel } from "../models/user.models";

/**
 * Router for handling book-related requests.
 */
const router = Router();

router
  .route("/")
  /**
   * Middleware to ensure that a valid JWT is provided.
   * Middleware to ensure that the user has the required permission level.
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
   * Handler for GET requests to retrieve all books.
   */
  .get(bookcontroller.getAllBooks)
  /**
   * Handler for POST requests to create a new book.
   * Middleware to ensure that the user has the required permission level.
   * Middleware to validate the book data.
   */
  .post(
    authcontroller.permissionLevelRequired([PermissionLevel.ADMIN, PermissionLevel.USER]),
    bookcontroller.BookValidation,
    bookcontroller.postBookCreate
  );

router
  .route("/:bookId")
  /**
   * Middleware to ensure that a valid JWT is provided.
   * Middleware to ensure that the user has the required permission level.
   */
  .all(
    authcontroller.validJWTNeeded,
    authcontroller.permissionLevelRequired([
      PermissionLevel.ADMIN,
      PermissionLevel.USER,
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
  .put(
    bookcontroller.BookValidation,
    bookcontroller.postBookUpdate,
  )
  /**
   * Handler for DELETE requests to delete a specific book by ID.
   * Middleware to delete the book data.
   * Middleware to ensure that the user has the required permission level.
   */
  .delete(
    bookcontroller.BookDelete,
    authcontroller.permissionLevelRequired([PermissionLevel.ADMIN])
  );

export default router;
