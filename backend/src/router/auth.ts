import express, { Router } from 'express';
import {
  Userlogin,
  Verify,
  UserSignup,
} from '../controller/auth';

export const authRoute: Router = express.Router();

authRoute.post('/signup', UserSignup);
authRoute.post('/login', Userlogin);
authRoute.post('/verify', Verify)
