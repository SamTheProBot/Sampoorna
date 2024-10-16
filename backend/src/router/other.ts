import express, { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';
import { HealthInsurence } from '../controller/HI';
import { ProvidentFunds } from '../controller/PF';
import { FixedDeposit } from '../controller/FD';
import { GovServices } from '../controller/services';
export const otherRoute: Router = express.Router();

otherRoute.post('/scanner', AuthMiddleware, GovServices);
otherRoute.get('/healthInsurence', AuthMiddleware, HealthInsurence);
otherRoute.get('/fixedDeposit', AuthMiddleware, FixedDeposit);
otherRoute.get('/providentFunds', AuthMiddleware, ProvidentFunds);
