import dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import sequelize from './config/database';
import indexRouter from './routes/index.routes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import cors from 'cors';

// For env File
dotenv.config();
const app: Application = express();
/**
 * The port number for the server to listen on.
 * If the PORT environment variable is set, it will use that value.
 * Otherwise, it will default to 8000.
 */
const port = process.env.PORT || 8000;

// Authenticate the connection to the database
sequelize.authenticate()

// Add middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// Add routes
app.use('/', indexRouter);
// Add middleware to handle errors
app.use(errors());
app.use((_: Request, res: Response) => {
  return res.status(500).send('Something broke!');
});




app.listen(port, () => {
            console.log(`Server is running on port: ${port}`)
        })

export default app