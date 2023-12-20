import { Router } from 'express';
import booksRoute from './books.routes';
import genresRoute from './genre.routes';
import authorsRoute from './author.routes';
import bookinstancesRoute from './bookInstance.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';

/**
 * The main router for the Library_TS application.
 * @remarks
 * This router handles all the routes for the application, including books, genres, authors, book instances, users, and authentication.
 */
const router = Router();

router.get('/', (req, res) => {
	return res.send('API is running');
});

router.use('/books', booksRoute);

router.use('/genres', genresRoute);

router.use('/authors', authorsRoute);

router.use('/bookinstances', bookinstancesRoute);

router.use('/users', userRouter);

router.use('/auth', authRouter);

export default router;
