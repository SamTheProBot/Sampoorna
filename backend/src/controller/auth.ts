import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
import UserSchema from '../model/user';
import { ethers } from 'ethers';
dotenv.config();


export const UserSignup = async (req: Request, res: Response) => {
  const { name, aadhar, abhaNumber, bankDetails } = req.body;

  if (!name || !aadhar || !abhaNumber || !bankDetails) {
    res.status(400).json({ message: `please provide all the information` });
  }
  const provider = new ethers.AlchemyProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = ethers.Wallet.createRandom();

  try {


    const user = await UserSchema.create({
      name: name,
      aadhar: aadhar,
      abhaNumber: abhaNumber,
      wallet: {
        address: wallet.address,
        private: wallet.privateKey,
      },
      bankDetails: {
        bankName: bankDetails.backName,
        accountNumber: bankDetails.accountNumber,
        accountType: bankDetails.accountType,
      }
    });

    const access_token = jwt.sign(
      { aadhar: aadhar, _id: user._id },
      process.env.JWT_TOKEN as string
    );

    res
      .status(201)
      .json({ message: `user created`, access_token: access_token });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};

export const Userlogin = async (req: Request, res: Response) => {
  const { name, aadhar } = req.body;

  if (!name || !aadhar) {
    res.status(400).json({ message: `please provide name and addhar` });
  }

  try {
    const user = await UserSchema.findOne({ aadhar: aadhar });
    if (!user) {
      return res.status(200).json({ message: `user not found` });
    }

    //const isMatch = await bcrypt.compare(password, user.password);
    //if (!isMatch)
    //return res.status(401).json({ message: `invalid credentials` });

    const access_token = jwt.sign(
      { aadhar: aadhar, _id: user._id },
      process.env.JWT_TOKEN as string
    );

    res
      .status(201)
      .json({ message: `login successful`, access_token: access_token });
  } catch (e) {
    res.status(500).json({ message: `server error ${e.message}` });
  }
};

//export const Userlogout = async (req: ExtendedRequset, res: Response) => {
//  try {
//    res
//      .status(200)
//      .clearCookie('access_token')
//      .clearCookie('refresh_token')
//      .json({ message: 'logout successful' });
//  } catch (e) {
//    res.status(500).json({ message: 'server error' });
//  }
//};
//
