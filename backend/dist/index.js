'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const express_1 = __importDefault(require('express'));
const database_1 = __importDefault(require('./config/database'));
const index_routes_1 = __importDefault(require('./routes/index.routes'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const body_parser_1 = __importDefault(require('body-parser'));
const celebrate_1 = require('celebrate');
const cors_1 = __importDefault(require('cors'));
// For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
/**
 * The port number for the server to listen on.
 * If the PORT environment variable is set, it will use that value.
 * Otherwise, it will default to 8000.
 */
const port = process.env.PORT || 8000;
// Authenticate the connection to the database
database_1.default.authenticate();
// Add middleware to parse incoming requests with JSON payloads
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Add routes
app.use('/', index_routes_1.default);
// Add middleware to handle errors
app.use((0, celebrate_1.errors)());
app.use((_, res) => {
	return res.status(500).send('Something broke!');
});
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
exports.default = app;
