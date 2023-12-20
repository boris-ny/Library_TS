'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteBookInstance =
	exports.updateBookInstance =
	exports.createBookInstance =
	exports.bookinstanceValidation =
	exports.getBookInstanceById =
	exports.getAllBookInstances =
		void 0;
const celebrate_1 = require('celebrate');
const bookinstance_models_1 = __importDefault(
	require('../models/bookinstance.models')
);
/**
 * Retrieves all book instances from the database.
 * @function
 * @async
 * @param {Request} _req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} - A promise that resolves to a JSON response containing the book instances.
 * @throws {Error} - If there was an error retrieving the book instances from the database.
 */
const getAllBookInstances = async (_req, res) => {
	try {
		const bookinstances = await bookinstance_models_1.default.findAll();
		return res.json({
			status: 200,
			message: 'success',
			data: bookinstances,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
exports.getAllBookInstances = getAllBookInstances;
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
const getBookInstanceById = async (req, res) => {
	try {
		const bookinstance = await bookinstance_models_1.default.findByPk(
			req.params.bookinstanceId
		);
		if (!bookinstance) {
			return res.status(404).json({
				status: 404,
				message: 'Book Instance not found',
			});
		}
		return res.json({
			status: 200,
			message: 'Book Instance Found',
			data: bookinstance,
		});
	} catch (err) {
		return res
			.status(500)
			.json({ message: 'Internal  Book Instance Id Error' });
	}
};
exports.getBookInstanceById = getBookInstanceById;
// Validation schema for the request body
const bookinstanceSchema = celebrate_1.Joi.object({
	book: celebrate_1.Joi.string().required(),
	book_id: celebrate_1.Joi.number().required(),
	imprint: celebrate_1.Joi.string().required(),
	status: celebrate_1.Joi.string().required(),
	due_back: celebrate_1.Joi.date().required(),
});
exports.bookinstanceValidation = (0, celebrate_1.celebrate)({
	[celebrate_1.Segments.BODY]: bookinstanceSchema,
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
const createBookInstance = async (req, res) => {
	try {
		const bookinstance = await bookinstance_models_1.default.create(req.body);
		return res.json({
			status: 200,
			message: 'Book Instance Created',
			data: bookinstance,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
exports.createBookInstance = createBookInstance;
// PUT /bookinstances/:id
/**
 * Updates a book instance by ID.
 * @param req - The request object containing the book instance ID and updated data.
 * @param res - The response object to send the updated book instance data or an error message.
 * @returns A JSON response containing the updated book instance data or an error message.
 */
const updateBookInstance = async (req, res) => {
	try {
		const bookinstance = await bookinstance_models_1.default.findByPk(
			req.params.bookinstanceId
		);
		if (!bookinstance) {
			return res.status(404).json({
				status: 404,
				message: 'Book Instance not found',
			});
		}
		await bookinstance.update(req.body);
		return res.json({
			status: 200,
			message: 'Book Instance Updated',
			data: bookinstance,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
exports.updateBookInstance = updateBookInstance;
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
const deleteBookInstance = async (req, res) => {
	try {
		const bookinstance = await bookinstance_models_1.default.findByPk(
			req.params.bookinstanceId
		);
		if (!bookinstance) {
			return res.status(404).json({
				status: 404,
				message: 'Book Instance not found',
			});
		}
		await bookinstance.destroy();
		return res.json({
			status: 200,
			message: 'Book Instance Deleted',
			data: bookinstance,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
exports.deleteBookInstance = deleteBookInstance;
