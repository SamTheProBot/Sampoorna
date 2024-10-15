import { Request, Response } from "express";
import { ExtendedRequset } from "../types/express";
import { Proto_Logs } from "../types/logs";
import Logs from "../model/logs";
import User from "../model/user";

export const GetAllLogs = async (req: Request, res: Response) => {
    try {
        const logs = await Logs.find();

        if (logs.length === 0) {
            return res.status(200).json({ message: 'no log found' });
        }

        return res.status(200).json(logs)
    } catch (e) {
        return res.status(500).json({ message: `internal server error` })
    }
}

export const GetLogs = async (req: ExtendedRequset, res: Response) => {
    const { _id, aadhar } = req.user;

    try {
        const user = await User.findById(_id);
        console.log(user.name)
        if (!user) {
            return res.status(404).json({ message: `user not found` })
        }

        const logs = await Logs.find({ from: user.wallet.address });
        if (logs.length === 0) {
            return res.status(200).json({ message: `no log found` });
        }
        return res.status(200).json(logs);

    } catch (e) {
        res.status(500).json({ message: `server error ${e.message}` });
    }
}

export const PostLogs: Proto_Logs = async (eventType, from, fromName, transaction_hash, to, toName, amount) => {
    try {
        await Logs.create({
            eventType,
            from,
            fromName,
            transaction_hash,
            to,
            toName,
            amount,
        })
        console.log(`log added`);
    } catch (e) {
        console.error(`server error ${e.message}`);
    }
}
