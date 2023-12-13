import { Request, Response } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import BookInstance from "../models/bookinstance.models";
import Book from "../models/book.models";

/**
 * Retrieves all book instances from the database.
 * @function
 * @async
 * @param {Request} _req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} - A promise that resolves to a JSON response containing the book instances.
 * @throws {Error} - If there was an error retrieving the book instances from the database.
 */
export const getAllBookInstances = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bookinstances = await BookInstance.findAll({include: [{ model: Book }]});
    return res.json({
      status: 200,
      message: "success",
      data: bookinstances,
    });
  } catch (err: unknown) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

// GET /bookinstances/:id

/**
 * Retrieves a book instance by its ID.
 * @function
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} - A Promise that resolves to a JSON response containing the book instance data.
 * @throws {Response} - A JSON response indicating an error occurred.
 */
export const getBookInstanceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bookinstance = await BookInstance.findOne({
      where: { id: req.params.bookinstanceId },
      include: [{ model: Book }],
    });

    if (!bookinstance) {
      return res.status(404).json({
        status: 404,
        message: "Book Instance not found",
      });
    }
    return res.json({
      status: 200,
      message: "Book Instance Found",
      data: bookinstance,
    });
  } catch (err: unknown) {
    return res
      .status(500)
      .json({ message: "Internal  Book Instance Id Error" });
  }
};

// Validation schema for the request body

const bookinstanceSchema = Joi.object({
  book_id: Joi.number().required(),
  imprint: Joi.string().required(),
  status: Joi.string().required(),
  due_back: Joi.date().required(),
});

export const bookinstanceValidation = celebrate({
  [Segments.BODY]: bookinstanceSchema,
});

// Create a new bookinstance on POST.

/**
 * Creates a new book instance.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Express response object with JSON data.
 * @throws {Error} - If there's an error creating the book instance.
 */
export const createBookInstance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bookinstance = await BookInstance.create(req.body);
    return res.json({
      status: 200,
      message: "Book Instance Created",
      data: bookinstance,
    });
  } catch (err: unknown) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

// PUT /bookinstances/:id

/**
 * Updates a book instance by ID.
 * @param req - The request object containing the book instance ID and updated data.
 * @param res - The response object to send the updated book instance data or an error message.
 * @returns A JSON response containing the updated book instance data or an error message.
 */
export const updateBookInstance = async (req: Request, res: Response) => {
  try {
    const bookinstance = await BookInstance.findByPk(req.params.bookinstanceId);
    if (!bookinstance) {
      return res.status(404).json({
        status: 404,
        message: "Book Instance not found",
      });
    }
    await bookinstance.update(req.body);
    return res.json({
      status: 200,
      message: "Book Instance Updated",
      data: bookinstance,
    });
  } catch (err: unknown) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

// DELETE /bookinstances/:id

/**
 * Deletes a book instance by ID.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Express response object with status and message.
 * @throws {Error} - If there's an error while deleting the book instance.
 */
export const deleteBookInstance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bookinstance = await BookInstance.findByPk(req.params.bookinstanceId);
    if (!bookinstance) {
      return res.status(404).json({
        status: 404,
        message: "Book Instance not found",
      });
    }
    await bookinstance.destroy();
    return res.json({
      status: 200,
      message: "Book Instance Deleted",
      data: bookinstance,
    });
  } catch (err: unknown) {
    return res.status(500).json({ message: (err as Error).message });
  }
};
