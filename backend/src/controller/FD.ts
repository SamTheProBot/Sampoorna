import { Response } from "express";
import { ExtendedRequset } from "../types/express";
import { ethers } from "ethers";
import { abi, contractAddress, provider } from "../util/constant"
import { decrypt } from '../util/encrytion';
import { PostLogs } from "./logs";
import User from '../model/user';
import dotenv from 'dotenv'
dotenv.config()

export const FixedDeposit = async (req: ExtendedRequset, res: Response) => {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).json({ message: `user not found` });
        }
        const privateAddress = decrypt(user.wallet.privateKey);
        const wallet = new ethers.Wallet(privateAddress, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        const transction = await contract.Apply_Fixed_Deposit();
        await transction.wait(1);

        await PostLogs(
            'fixed_deposit',
            user.wallet.address,
            user.name,
            transction.hash,
            contractAddress,
            'Block Chain',
            0
        );

        return res.status(200).json({ message: `fixed_deposit approved` })
    } catch (e) {
        return res.status(500).json({ message: `server error ${e.message}` })
    }
}
