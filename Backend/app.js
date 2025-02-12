import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import errorHandler from './middlewares/errorHandler.js';
dotenv.config();

const app = express();
connectDB();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/users', userRoutes);

// Use the error handling middleware
app.use(errorHandler);

export default app;