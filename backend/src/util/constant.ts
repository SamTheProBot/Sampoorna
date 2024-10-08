import { ethers } from "ethers";
import { InterfaceAbi } from "ethers";
import dotenv from 'dotenv';
dotenv.config()

export const contractAddress = '';
export const abi:InterfaceAbi = [{}];
export const provider:any = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
//export const provider = new ethers.AlchemyProvider(process.env.SEPOLIA_RPC_URL);
