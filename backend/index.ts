import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import RateLimit from './src/middleware/ratelimiter';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { authRoute } from './src/router/auth';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || process.env.LOCALPORT;

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(helmet());

app.use('/api/v1/auth/', authRoute);
app.use('/api/', RateLimit);

const Start = () => {
  app.listen(port, async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI),
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      };
    } catch (e) {
      console.error(`something went wrong, ${e}`);
    }
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

Start();
