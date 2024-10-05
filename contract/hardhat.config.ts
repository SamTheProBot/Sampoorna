import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: { compilers: [{ version: '0.8.26' }, { version: '0.8.27' }] },
};

export default config;
