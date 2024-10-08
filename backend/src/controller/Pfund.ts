import { Response } from "express";
import { ExtendedRequset } from "../types/express";
import { ethers } from "ethers";
import { abi, contractAddress, provider } from "../util/constant" 
import { decrypt } from '../util/encrytion';
import User from '../model/user';
import dotenv from 'dotenv'
dotenv.config()

export const ProvidentFunds = async (req:ExtendedRequset, res:Response) => {
    const { _id, aadhar } = req.user;

    try{
        const user = await User.findById(_id);
        if(!user){
            res.status(404).json({message: `user not found`});
        }

        const privateAddress = decrypt(user.wallet.privateKey);
        const wallet = new ethers.Wallet(privateAddress, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);
        
    }catch(e){
        res.status(500).json({message: `server error ${e.message}`})        
    }
}