'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.permissionLevelRequired =
	exports.validJWTNeeded =
	exports.login =
		void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const user_models_1 = __importDefault(require('../models/user.models'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
// Controller for Login
const login = async (req, res) => {
	const secret = process.env.JWT_SECRET || '';
	try {
		const user = await user_models_1.default.findOne({
			where: { email: req.body.email },
		});
		if (!user) {
			return res.status(401).json({
				status: 401,
				message: 'Invalid email or password',
			});
		}
		console.log(req.body.password, user.password);
		const passwordIsValid = await bcrypt_1.default.compare(
			req.body.password,
			user.password
		);
		if (!passwordIsValid) {
			return res.status(401).json({
				status: 401,
				message: 'Invalid email or password',
			});
		}
		const userData = {
			id: user.id,
			permissionLevel: user.permissionLevel,
		};
		let token = jsonwebtoken_1.default.sign(userData, secret, {
			expiresIn: '5 days',
		});
		let refresh_token = jsonwebtoken_1.default.sign(userData, secret, {
			expiresIn: '30 days',
		});
		return res
			.status(201)
			.json({ accessToken: token, refreshToken: refresh_token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Internal Users Error' });
	}
};
exports.login = login;
/**
 * Middleware function to check if a valid JWT access token is present in the request headers.
 * If a valid token is present, the request object is updated with user information.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const validJWTNeeded = (req, res, next) => {
	if (req.headers['authorization']) {
		try {
			const secret = process.env.JWT_SECRET || '';
			let authorization = req.headers['authorization'].split(' ');
			if (authorization[0] !== 'Bearer') {
				return res.status(401).json({ message: 'Unauthorized' });
			} else {
				req.user = jsonwebtoken_1.default.verify(authorization[1], secret);
				return next();
			}
		} catch (err) {
			return res.status(403).json({ message: 'Unauthorized' });
		}
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};
exports.validJWTNeeded = validJWTNeeded;
/**
 * Middleware function to check if the user making the request has the required permission level.
 * @param required_permission_level - Array of permission levels required to access the resource
 * @returns Express middleware function
 */
const permissionLevelRequired = (required_permission_level) => {
	return (req, res, next) => {
		//console.log(req.user);
		const userPermissionLevel = parseInt(req.user.permissionLevel);
		if (required_permission_level.includes(userPermissionLevel)) {
			return next();
		} else {
			return res.status(403).json({ message: 'Forbidden' });
		}
	};
};
exports.permissionLevelRequired = permissionLevelRequired;
