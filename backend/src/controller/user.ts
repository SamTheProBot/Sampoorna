import { Response } from "express";
import { ExtendedRequset } from "../types/express";
import User from '../model/user';
import dotenv from 'dotenv'
import { provider } from "../util/constant";
import { ethers } from "ethers";
dotenv.config()

export const UserInfo = async (req: ExtendedRequset, res: Response) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: `user not found` });
    }

    const val = await provider.getBalance(user.wallet.address);
    const balance = ethers.formatEther(val);

    const bankName = user.bankDetails.bankName;
    const { name, aadhar, age, status, contact } = user;
    return res.status(200).json({ name, aadhar, age, contact, balance, bankName, status })

  } catch (e) {
    return res.status(500).json({ message: `server error ${e.message}` })
  }
}
