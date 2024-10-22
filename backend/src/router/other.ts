import express, { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';
import { GovServices, HealthInsurence, FixedDeposit, ProvidentFunds, CancelFixedDeposit, CancelProvidentFunds } from '../controller/services';
import { UserInfo } from '../controller/user';
export const otherRoute: Router = express.Router();


otherRoute.post('/scanner', AuthMiddleware, GovServices);
otherRoute.get('/healthInsurence', AuthMiddleware, HealthInsurence);
otherRoute.get('/fixedDeposit', AuthMiddleware, FixedDeposit);
otherRoute.get('/providentFunds', AuthMiddleware, ProvidentFunds);
otherRoute.get('/userInfo', AuthMiddleware, UserInfo);
