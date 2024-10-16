import { Response } from "express";
import { ExtendedRequset } from "../types/express";
import { ethers } from "ethers";
import { abi, contractAddress, provider } from "../util/constant"
import { decrypt } from '../util/encrytion';
import User from '../model/user';
import dotenv from 'dotenv'
import { PostLogs } from "./logs";
dotenv.config()

export const ProvidentFunds = async (req: ExtendedRequset, res: Response) => {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: `user not found` });
        }
        const privateAddress = decrypt(user.wallet.privateKey);
        const wallet = new ethers.Wallet(privateAddress, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        const transction = await contract.Apply_Provident_Fund();
        await transction.wait(1);

        await PostLogs(
            'health_insurence',
            user.wallet.address,
            user.name,
            transction.hash,
            contractAddress,
            'Block Chain',
            0
        );

        return res.status(200).json({ message: `Provident Funds approved` })
    } catch (e) {
        return res.status(500).json({ message: `server error ${e.message}` })
    }
}
