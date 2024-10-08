import { Request } from 'express';

export interface ExtendedRequset extends Request {
  user?: {
    aadhar: string;
    _id: string;
    iat: number;
  };
}