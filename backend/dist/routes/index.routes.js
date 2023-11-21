"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_routes_1 = __importDefault(require("./books.routes"));
const genre_routes_1 = __importDefault(require("./genre.routes"));
const author_routes_1 = __importDefault(require("./author.routes"));
const bookInstance_routes_1 = __importDefault(require("./bookInstance.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
/**
 * The main router for the Library_TS application.
 * @remarks
 * This router handles all the routes for the application, including books, genres, authors, book instances, users, and authentication.
 */
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    return res.send("API is running");
});
router.use('/books', books_routes_1.default);
router.use('/genres', genre_routes_1.default);
router.use('/authors', author_routes_1.default);
router.use('/bookinstances', bookInstance_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/auth', auth_routes_1.default);
exports.default = router;
