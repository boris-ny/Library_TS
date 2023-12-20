import { Request, Response } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import bcrypt from 'bcrypt';
import User from '../models/user.models';

// GET /users

export const getAllUsers = async (_req: Request, res: Response) => {
	try {
		const users = await User.findAll({});
		return res.json({
			status: 200,
			message: 'success',
			data: users,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal Users Error' });
	}
};

// GET /users/:id

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await User.findByPk(req.params.userId);
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: 'User not found',
			});
		}
		return res.json({
			status: 200,
			message: `User ${req.params.userId} found`,
			data: user,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal Users Error' });
	}
};

// User Validation

const userSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	password2: Joi.any()
		.valid(Joi.ref('password'))
		.required()
		.messages({ 'any.only': 'must match password' }),
});

export const UserValidation = celebrate({ [Segments.BODY]: userSchema });

// POST /users
export const createUser = async (req: Request, res: Response) => {
	try {
		const existingUser = User.findOne({ where: { email: req.body.email } });

		if (existingUser == req.body.email) {
			return res.status(400).json({ error: 'User already exists' });
		}
		if (req.body.password) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			// Replace the plain text password with the hashed password
			req.body.password = hashedPassword;
		}
		const user = await User.create(req.body);
		return res.json({
			status: 200,
			message: 'User Created',
			data: user,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal Users Error' });
	}
};

// Update User

export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByPk(req.params.userId);
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: 'User not found',
			});
		}
		//console.log(user);
		if (req.body.password) {
			// Hash the new password
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			// Replace the plain text password with the hashed password
			req.body.password = hashedPassword;
		}
		await user.update(req.body);
		return res.json({
			status: 200,
			message: `User ${req.params.userId} updated`,
			data: user,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal Users Error' });
	}
};

// Delete User

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByPk(req.params.userId);
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: 'User not found',
			});
		}
		await user.destroy();
		return res.json({
			status: 200,
			message: `User ${req.params.userId} deleted`,
			data: user,
		});
	} catch (err: unknown) {
		return res.status(500).json({ message: 'Internal Users Error' });
	}
};
