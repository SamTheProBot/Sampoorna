import { Request, Response } from "express";
import { Proto_Logs } from "../types/logs";
import Logs from "../model/logs";
import User from "../model/user";

export const GetLogs = async (req:Request, res: Response) => {
    const { aadhar } = req.body;
    let filter:any = {};
    
    try{
        if(aadhar){
            const user = await User.findOne({aadhar: aadhar});

            if(!user) res.status(404).json({message: `no user found`});

            filter = {from:user.wallet.address };
        }
        const logs = await Logs.find(filter);

        if(logs.length == 0){
            res.status(401).json({message: `no log found`});
        }
        return res.status(200).json({logs});

    }catch(e){
        res.status(500).json({message: `server error ${e.message}`});
    }   
}

export const PostLogs:Proto_Logs = async (eventType, fromName , from, transaction_hash, to, toName, amount) => {
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
    } catch (e){
        console.error(`server error ${e.message}`);
    }
}