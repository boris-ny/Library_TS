'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteGenre =
	exports.updateGenre =
	exports.createGenre =
	exports.genreValidation =
	exports.getGenreById =
	exports.getAllGenres =
		void 0;
const genre_models_1 = __importDefault(require('../models/genre.models'));
const celebrate_1 = require('celebrate');
// GET /genres
const getAllGenres = async (_req, res) => {
	try {
		const genres = await genre_models_1.default.findAll();
		return res.json({
			status: 200,
			message: 'success',
			data: genres,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};
exports.getAllGenres = getAllGenres;
// GET /genres/:id
const getGenreById = async (req, res) => {
	try {
		const genre = await genre_models_1.default.findByPk(req.params.genreId);
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
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
exports.getGenreById = getGenreById;
// Validation schema for the request body
const genreSchema = celebrate_1.Joi.object({
	name: celebrate_1.Joi.string().required(),
});
exports.genreValidation = (0, celebrate_1.celebrate)({
	[celebrate_1.Segments.BODY]: genreSchema,
});
// Create a new genre on POST.
const createGenre = async (req, res) => {
	try {
		const genre = await genre_models_1.default.create(req.body);
		return res.json({
			status: 200,
			message: 'success',
			data: genre,
		});
	} catch (err) {
		return res.status(500).json({ message: 'Internal error' });
	}
};
exports.createGenre = createGenre;
// PUT /genres/:id
const updateGenre = async (req, res) => {
	try {
		const genre = await genre_models_1.default.findByPk(req.params.genreId);
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
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
exports.updateGenre = updateGenre;
// DELETE /genres/:id
const deleteGenre = async (req, res) => {
	try {
		const genre = await genre_models_1.default.findByPk(req.params.genreId);
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
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Genre is linked to  a certain book` });
	}
};
exports.deleteGenre = deleteGenre;
