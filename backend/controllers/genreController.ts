/* eslint-disable no-console */
import Genre from '../models/genre.models';
import { Request, Response } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Book from '../models/book.models';

// GET /genres

export const getAllGenres = async (_req: Request, res: Response) => {
	try {
		const genres = await Genre.findAll({
			include: [{ model: Book }],
		});
		return res.json({
			status: 200,
			message: 'success',
			data: genres,
		});
	} catch (err: unknown) {
		console.log(err);
		res.status(500).json({ message: (err as Error).message });
	}
};

// GET /genres/:id

export const getGenreById = async (req: Request, res: Response) => {
	try {
		const genre = await Genre.findByPk(req.params.genreId, {
			include: [{ model: Book }],
		});

		if (!genre) {
			return res.status(404).json({
				status: 404,
				message: 'Genre not found',
			});
		}
		res.json({
			status: 200,
			message: 'success',
			data: genre,
		});
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};

// Validation schema for the request body
const genreSchema = Joi.object({
	name: Joi.string().required(),
});

export const genreValidation = celebrate({ [Segments.BODY]: genreSchema });

// Create a new genre on POST.

export const createGenre = async (req: Request, res: Response) => {
	try {
		const genre = await Genre.create(req.body);
		return res.json({
			status: 200,
			message: 'success',
			data: genre,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal error' });
	}
};

// PUT /genres/:id

export const updateGenre = async (req: Request, res: Response) => {
	try {
		const genre = await Genre.findByPk(req.params.genreId);
		if (!genre) {
			return res.status(404).json({
				status: 404,
				message: 'Genre not found',
			});
		}
		await genre.update(req.body);
		res.json({
			status: 200,
			message: 'Updated successfully',
			data: genre,
		});
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};

// DELETE /genres/:id
export const deleteGenre = async (req: Request, res: Response) => {
	try {
		const genre = await Genre.findByPk(req.params.genreId);
		if (!genre) {
			return res.status(404).json({
				status: 404,
				message: 'Genre not found',
			});
		}
		await genre.destroy();
		res.json({
			status: 200,
			message: 'Deleted successfully',
			data: genre,
		});
	} catch (err: unknown) {
		console.log(err);
		res.status(500).json({ message: `Genre is linked to  a certain book` });
	}
};
