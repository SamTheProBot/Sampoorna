import express, { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';
import { GovServices } from '../controller/services';
export const otherRoute: Router = express.Router();

otherRoute.post('/scanner', AuthMiddleware , GovServices);
