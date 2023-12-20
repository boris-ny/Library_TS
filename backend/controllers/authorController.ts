import { Request, Response } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Author from '../models/author.models';

// GET /authors
//Test
/**
 * Retrieves all authors from the database.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Express response object with JSON data containing all authors.
 * @throws {Error} - If there's an error while retrieving authors from the database.
 */
export const getAllAuthors = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const authors = await Author.findAll({});
		return res.json({
			status: 200,
			message: 'success',
			data: authors,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: (err as Error).message });
	}
};

/**
 * Retrieves an author by their ID.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Express response object with author data or error message.
 */
export const getAuthorById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const author = await Author.findByPk(req.params.authorId);

		if (!author) {
			return res.status(404).json({
				status: 404,
				message: 'Author not found',
			});
		}
		return res.json({
			status: 200,
			message: 'success',
			data: author,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: (err as Error).message });
	}
};

/**
 * Defines the author schema using Joi validation library.
 * @remarks
 * The schema includes the following properties:
 * - first_name: required string
 * - family_name: required string
 * - date_of_birth: required date
 * - date_of_death: optional date
 */
const authorSchema = Joi.object({
	first_name: Joi.string().required(),
	family_name: Joi.string().required(),
	date_of_birth: Joi.date().required(),
	date_of_death: Joi.date(),
});

export const authorValidation = celebrate({ [Segments.BODY]: authorSchema });

/**
 * Creates a new author.
 * @function
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} - The response object with status, message and data.
 */
export const createAuthor = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const author = await Author.create(req.body);
		return res.json({
			status: 200,
			message: 'success',
			data: author,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal error' });
	}
};

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
export const updateAuthor = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const author = await Author.findByPk(req.params.authorId);

		if (!author) {
			return res.status(404).json({
				status: 404,
				message: 'Author not found',
			});
		}
		await author.update(req.body);
		return res.json({
			status: 200,
			message: 'Updated author sucessfully',
			data: author,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: (err as Error).message });
	}
};

// Delete an author on DELETE.

/**
 * Deletes an author from the database.
 * @param req - The request object containing the author ID to delete.
 * @param res - The response object to send the result of the operation.
 * @returns {Promise<Response>}A JSON response containing the status code, message, and deleted author data if successful.
 */
export const deleteAuthor = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const author = await Author.findByPk(req.params.authorId);

		if (!author) {
			return res.status(404).json({
				status: 404,
				message: 'Author not found',
			});
		}
		await author.destroy();
		return res.json({
			status: 200,
			message: 'Deleted successfully',
			data: author,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: (err as Error).message });
	}
};
