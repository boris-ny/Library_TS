"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBookUpdate = exports.BookDelete = exports.postBookCreate = exports.BookValidation = exports.getBookById = exports.getAllBooks = void 0;
const book_models_1 = __importDefault(require("../models/book.models"));
const celebrate_1 = require("celebrate");
// GET /books
const getAllBooks = async (_req, res) => {
    try {
        const books = await book_models_1.default.findAll();
        return res.json({
            status: 200,
            message: "success",
            data: books,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getAllBooks = getAllBooks;
// GET /books/:id
const getBookById = async (req, res) => {
    try {
        const book = await book_models_1.default.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                status: 404,
                message: "Book not found",
            });
        }
        return res.json({
            status: 200,
            message: "success",
            data: book,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Error" });
    }
};
exports.getBookById = getBookById;
// Validation schema for the request body
const bookSchema = celebrate_1.Joi.object({
    title: celebrate_1.Joi.string().required(),
    authorId: celebrate_1.Joi.number().required(),
    summary: celebrate_1.Joi.string().required(),
    isbn: celebrate_1.Joi.string().required(),
    genreId: celebrate_1.Joi.number().required(),
});
exports.BookValidation = (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: bookSchema });
// Handle book create on POST
/**
 * Creates a new book and returns it as a JSON response.
 * @function
 * @async
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<Response>} - Promise that resolves with a JSON response containing the created book.
 * @throws {Error} - If there's an error creating the book, it will be caught and a 500 status code will be sent with an error message.
 */
const postBookCreate = async (req, res) => {
    try {
        const book = await book_models_1.default.create(req.body);
        return res.json({
            status: 200,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.postBookCreate = postBookCreate;
/**
 * Deletes a book with the specified ID.
 * @function
 * @async
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<Response>} - Promise object that represents the completion of the operation.
 */
const BookDelete = async (req, res) => {
    try {
        const book = await book_models_1.default.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                status: 404,
                message: "Book not found",
            });
        }
        await book.destroy();
        return res.json({
            status: 200,
            message: "Book deleted successfully",
            book: book.id,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.BookDelete = BookDelete;
// Handle book update on POST.
/**
 * Updates a book by ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @returns A JSON response indicating the status of the update operation.
 */
const postBookUpdate = async (req, res) => {
    try {
        const book = await book_models_1.default.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                status: 404,
                message: "Book not found",
            });
        }
        await book.update(req.body);
        res.json({
            status: 200,
            message: "Book updated successfully",
            book: book.id,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.postBookUpdate = postBookUpdate;
