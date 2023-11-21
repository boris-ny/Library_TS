"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.authorValidation = exports.getAuthorById = exports.getAllAuthors = void 0;
const celebrate_1 = require("celebrate");
const author_models_1 = __importDefault(require("../models/author.models"));
// GET /authors
/**
 * Retrieves all authors from the database.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Express response object with JSON data containing all authors.
 * @throws {Error} - If there's an error while retrieving authors from the database.
 */
const getAllAuthors = async (req, res) => {
    try {
        const authors = await author_models_1.default.findAll({});
        return res.json({
            status: 200,
            message: "success",
            data: authors,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getAllAuthors = getAllAuthors;
/**
 * Retrieves an author by their ID.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Express response object with author data or error message.
 */
const getAuthorById = async (req, res) => {
    try {
        const author = await author_models_1.default.findByPk(req.params.authorId);
        if (!author) {
            return res.status(404).json({
                status: 404,
                message: "Author not found",
            });
        }
        return res.json({
            status: 200,
            message: "success",
            data: author,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getAuthorById = getAuthorById;
/**
 * Defines the author schema using Joi validation library.
 * @remarks
 * The schema includes the following properties:
 * - first_name: required string
 * - family_name: required string
 * - date_of_birth: required date
 * - date_of_death: optional date
 */
const authorSchema = celebrate_1.Joi.object({
    first_name: celebrate_1.Joi.string().required(),
    family_name: celebrate_1.Joi.string().required(),
    date_of_birth: celebrate_1.Joi.date().required(),
    date_of_death: celebrate_1.Joi.date(),
});
exports.authorValidation = (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: authorSchema });
/**
 * Creates a new author.
 * @function
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} - The response object with status, message and data.
 */
const createAuthor = async (req, res) => {
    try {
        const author = await author_models_1.default.create(req.body);
        return res.json({
            status: 200,
            message: "success",
            data: author,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "intern" });
    }
};
exports.createAuthor = createAuthor;
// Update an author on PUT.
/**
 * Updates an author in the database.
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} A promise that resolves to the updated author object.
 * @throws {Error} If there is an error updating the author.
 */
const updateAuthor = async (req, res) => {
    try {
        const author = await author_models_1.default.findByPk(req.params.authorId);
        if (!author) {
            return res.status(404).json({
                status: 404,
                message: "Author not found",
            });
        }
        await author.update(req.body);
        return res.json({
            status: 200,
            message: "Updated author sucessfully",
            data: author,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.updateAuthor = updateAuthor;
// Delete an author on DELETE.
/**
 * Deletes an author from the database.
 * @param req - The request object containing the author ID to delete.
 * @param res - The response object to send the result of the operation.
 * @returns {Promise<Response>}A JSON response containing the status code, message, and deleted author data if successful.
 */
const deleteAuthor = async (req, res) => {
    try {
        const author = await author_models_1.default.findByPk(req.params.authorId);
        if (!author) {
            return res.status(404).json({
                status: 404,
                message: "Author not found",
            });
        }
        await author.destroy();
        return res.json({
            status: 200,
            message: "Deleted successfully",
            data: author,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.deleteAuthor = deleteAuthor;
