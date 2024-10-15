import { Response } from "express";
import { ExtendedRequset } from "../types/express";
import { ethers } from "ethers";
import { provider } from "../util/constant"
import { PostLogs } from "./logs";
import { decrypt } from '../util/encrytion';
import User from '../model/user';
import dotenv from 'dotenv'
dotenv.config()

export const GovServices = async (req: ExtendedRequset, res: Response) => {
    let { address, amount, name } = req.body;
    const { _id } = req.user;

    try {
        amount = amount * 1000;
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).json({ message: `user not found` });
        }
        const privateAddress = decrypt(user.wallet.privateKey);
        const wallet = new ethers.Wallet(privateAddress, provider);
        const tx = {
            to: address,
            value: amount,
        }

        const transaction = await wallet.sendTransaction(tx);

        res.status(200).json({ message: 'TransctionSigned' })

        transaction.wait(1);

        await PostLogs("payment", user.wallet.address, user.name, transaction.hash, address, name, amount);
    } catch (e) {
        res.status(500).json({ message: `server error ${e.message}` })
    }
}
