import express, { Router } from 'express';
import {
  Userlogin,
  UserSignup,
  UserRemove,
  Userlogout,
  RefreshToken,
  IsUserLogin,
} from '../controller/auth';

export const authRoute: Router = express.Router();

authRoute.get('/islogin', IsUserLogin);
authRoute.post('/signup', UserSignup);
authRoute.post('/login', Userlogin);
authRoute.get(`/logout`, Userlogout);
authRoute.post('/refreshtoken', Userlogin);
