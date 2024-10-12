import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { encrypt } from '../util/encrytion';
import User from '../model/user';
import { ethers } from 'ethers';
dotenv.config();


export const UserSignup = async (req: Request, res: Response) => {
  const { name, aadhar, abhaNumber, bankDetails, age } = req.body;

    if (!name || !aadhar || !abhaNumber || !bankDetails) {
     return res.status(400).json({ message: `please provide all the information` });
    }
    

  try {
    
    const wallet = ethers.Wallet.createRandom();

    const user = await User.create({
      name: name,
      aadhar: aadhar,
      abhaNumber: abhaNumber,
      age: age,
      wallet: {
        address: wallet.address,
        privateKey: encrypt(wallet.privateKey),
      },
      bankDetails: {
        bankName: bankDetails.bankName,
        accountNumber: bankDetails.accountNumber,
        ifsc: bankDetails.ifsc,
      }
    });

    console.log(user)

    const access_token = jwt.sign(
      { aadhar: aadhar, _id: user._id },
      process.env.JWT_TOKEN as string
    );

    return res
      .status(201)
      .json({ message: `user created`, access_token: access_token });

  } catch (e) {
    return res.status(500).json({ message: `server error ${e}` });
  }
};

export const Userlogin = async (req: Request, res: Response) => {
  const { name, aadhar } = req.body;

  if (!name || !aadhar) {
    return res.status(400).json({ message: `please provide name and addhar` });
  }

  try {
    const user = await User.findOne({ aadhar: aadhar });
    if (!user) {
      return res.status(200).json({ message: `user not found` });
    }

    const access_token = jwt.sign(
      { aadhar: aadhar, _id: user._id },
      process.env.JWT_TOKEN as string
    );

    return res
      .status(201)
      .json({ message: `login successful`, access_token: access_token });
  } catch (e) {
    return res.status(500).json({ message: `server error ${e.message}` });
  }
};
