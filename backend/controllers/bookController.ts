import { Request, Response } from 'express';
import Book from '../models/book.models';
import Author from '../models/author.models';
import { celebrate, Joi, Segments } from 'celebrate';
import Genre from '../models/genre.models';

// GET /books

export const getAllBooks = async (_req: Request, res: Response) => {
	try {
		const books = await Book.findAll({
			include: [{ model: Genre }, { model: Author }],
		});
		return res.json({
			status: 200,
			message: 'success',
			data: books,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: (err as Error).message });
	}
};

// GET /books/:id
export const getBookById = async (req: Request, res: Response) => {
	try {
		const book = await Book.findOne({
			where: { id: req.params.bookId },
			include: [{ model: Genre }, { model: Author }],
		});

		if (!book) {
			return res.status(404).json({
				status: 404,
				message: 'Book not found',
			});
		}

		return res.json({
			status: 200,
			message: 'success',
			data: book,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal Error' });
	}
};

// Validation schema for the request body
const bookSchema = Joi.object({
	title: Joi.string().required(),
	authorId: Joi.number().required(),
	summary: Joi.string().required(),
	isbn: Joi.string().required(),
	genreId: Joi.number().required(),
});

export const BookValidation = celebrate({ [Segments.BODY]: bookSchema });

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
export const postBookCreate = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const book = await Book.create(req.body);
		return res.json({
			status: 200,
			message: 'Book created successfully',
			data: book,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: (err as Error).message });
	}
};

/**
 * Deletes a book with the specified ID.
 * @function
 * @async
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<Response>} - Promise object that represents the completion of the operation.
 */
export const BookDelete = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const book = await Book.findByPk(req.params.bookId);
		if (!book) {
			return res.status(404).json({
				status: 404,
				message: 'Book not found',
			});
		}
		await book.destroy();
		return res.json({
			status: 200,
			message: 'Book deleted successfully',
			book: book.id,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: (err as Error).message });
	}
};

// Handle book update on POST.
/**
 * Updates a book by ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @returns A JSON response indicating the status of the update operation.
 */
export const postBookUpdate = async (req: Request, res: Response) => {
	try {
		const book = await Book.findByPk(req.params.bookId);
		if (!book) {
			return res.status(404).json({
				status: 404,
				message: 'Book not found',
			});
		}
		await book.update(req.body);
		res.json({
			status: 200,
			message: 'Book updated successfully',
			book: book.id,
		});
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};
