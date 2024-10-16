import { Response } from "express";
import { ExtendedRequset } from "../types/express";
import { ethers } from "ethers";
import { abi, contractAddress, provider } from "../util/constant"
import { decrypt } from '../util/encrytion';
import User from '../model/user';
import dotenv from 'dotenv'
import { PostLogs } from "./logs";
dotenv.config()

export const HealthInsurence = async (req: ExtendedRequset, res: Response) => {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).json({ message: `user not found` });
        }
        const privateAddress = decrypt(user.wallet.privateKey);
        const wallet = new ethers.Wallet(privateAddress, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        const transction = await contract.Apply_Health_Insurance();
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

        res.status(200).json({ message: `insurencse activated` });
    } catch (e) {
        res.status(500).json({ message: `server error ${e.message}` })
    }
}
