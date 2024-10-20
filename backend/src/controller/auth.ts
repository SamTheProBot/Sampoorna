import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user';
import Verification from '../model/code'
import twilio from "twilio";
import { Request, Response } from 'express';
import { encrypt } from '../util/encrytion';
import { abi, contractAddress, provider, adminPrivateKey } from '../util/constant';
import { ethers } from 'ethers';
dotenv.config();

const sid = process.env.ACCOUNTSID;
const token = process.env.AUTHTOKEN;
const client = twilio(sid, token);

export const UserSignup = async (req: Request, res: Response) => {
  const { name, aadhar, abhaNumber, bankDetails, age, contact } = req.body;

  if (!name || !aadhar || !abhaNumber || !bankDetails || !age || !contact) {
    return res.status(400).json({ message: `please provide all the information` });
  }
  try {

    const wallet = ethers.Wallet.createRandom(provider);
    const adminWallet = new ethers.Wallet(adminPrivateKey, provider);

    const user = await User.create({
      name: name,
      aadhar: aadhar,
      abhaNumber: abhaNumber,
      contact: contact,
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

    const contract = new ethers.Contract(contractAddress, abi, adminWallet)

    const tx = await contract.AddUser(wallet)
    await tx.wait();

    const access_token = jwt.sign(
      { contact: contact, _id: user._id },
      process.env.JWT_TOKEN as string
    );

    console.log(`user added successfully`);
    return res
      .status(201)
      .json({ message: `user created`, access_token: access_token });

  } catch (e) {
    return res.status(500).json({ message: `server error ${e}` });
  }
};

export const Userlogin = async (req: Request, res: Response) => {
  const { name, contact } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: `please provide name and contact` });
  }
  try {
    const user = await User.findOne({ contact: contact });
    if (!user) {
      return res.status(404).json({ message: `user not found` });
    }
    const genCode = Math.floor(100000 + Math.random() * 900000).toString();

    await client.messages
      .create({
        body: `${genCode}`,
        from: '+14053515799',
        to: `+91${contact}`
      })

    await Verification.create({
      contact: contact,
      code: genCode,
    })

    return res
      .status(200)
      .json({ message: `code send` })
  } catch (e) {
    return res.status(500).json({ message: `server error ${e.message}` });
  }
};


export const Verify = async (req: Request, res: Response) => {
  const { contact, code } = req.body;
  if (!contact || !code) {
    return res.status(400).json({ error: 'please provide contact and code' });
  }
  try {
    const verify = await Verification.findOne({ contact: contact });
    if (verify && verify.code === code) {
      const user = await User.findOne({ contact: contact });
      if (!user) {
        return res.status(404).json({ message: `user not found` });
      }
      const access_token = jwt.sign(
        { contact: contact, _id: user._id },
        process.env.JWT_TOKEN as string
      );
      await Verification.deleteOne({ contact: contact })
      console.log('user logined succesfully');
      return res.status(200).json({ message: `login successful`, access_token: access_token });
    } else {
      return res.status(400).json({ error: 'invalid code or contact' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

