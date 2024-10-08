import express, { Router } from 'express';
import {
  Userlogin,
  UserSignup,
} from '../controller/auth';

export const authRoute: Router = express.Router();

authRoute.post('/signup', UserSignup);
authRoute.post('/login', Userlogin);
