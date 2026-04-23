import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import testRouter from './routes/test.js';
import authRouter from './routes/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.get('/', (req, res) => {
  res.json({
    message: 'TaskPro API is running',
  });
});

app.use('/test', testRouter);
app.use('/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;