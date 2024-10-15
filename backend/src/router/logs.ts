import express, { Router } from 'express'
import { GetLogs, GetAllLogs } from '../controller/logs'
import { AuthMiddleware } from '../middleware/auth';
export const logRoute: Router = express.Router();


logRoute.get('/getlogs', AuthMiddleware, GetLogs);
logRoute.get('/logs', GetAllLogs);
