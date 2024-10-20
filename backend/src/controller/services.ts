import { Response } from "express";
import { ExtendedRequset } from "../types/express";
import { ethers } from "ethers";
import { abi, contractAddress, provider } from "../util/constant";
import { PostLogs } from "./logs";
import { decrypt } from '../util/encrytion';
import { ErrorHandler } from "../util/contractHandler";
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

export const FixedDeposit = async (req: ExtendedRequset, res: Response) => {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: `user not found` });
        }
        const privateAddress = decrypt(user.wallet.privateKey);
        const wallet = new ethers.Wallet(privateAddress, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        let transction: any;
        try {
            transction = await contract.Apply_Fixed_Deposit()
        } catch (e) {
            const err = ErrorHandler(e);
            if (err != null) {
                return res.status(200).json({ message: e.reason });
            } else {
                return res.status(500).json({ message: `blockchain error` })
            }
        }
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

export const HealthInsurence = async (req: ExtendedRequset, res: Response) => {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: `user not found` });
        }
        const privateAddress = decrypt(user.wallet.privateKey);
        const wallet = new ethers.Wallet(privateAddress, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);
        let transaction: any;
        try {
            transaction = await contract.Apply_Health_Insurance();
        } catch (e) {
            const err = ErrorHandler(e);
            if (err) {
                return res.status(200).json({ message: e.reason });
            } else {
                return res.status(500).json({ message: 'Blockchain error' });
            }
        }
        await transaction.wait(1);

        await PostLogs(
            'health_insurence',
            user.wallet.address,
            user.name,
            transaction.hash,
            contractAddress,
            'Block Chain',
            0
        );

        return res.status(200).json({ message: `insurencse activated` });
    } catch (e) {
        return res.status(500).json({ message: `server error ${e.message}` })
    }
}

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
        let transction: any;
        try {
            transction = await contract.Apply_Provident_Fund()
        } catch (e) {
            const err = ErrorHandler(e);
            if (err != null) {
                return res.status(200).json({ message: e.reason });
            } else {
                return res.status(500).json({ message: `blockchain error` })
            }
        }
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
