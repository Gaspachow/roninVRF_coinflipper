import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';
import secrets from './.secrets.json';



const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    ronin: {
      chainId: 2020,
      url: "https://api.roninchain.com/rpc",
    },
    saigon: {
      chainId: 2021,
      url: "https://saigon-testnet.roninchain.com/rpc",
      accounts: [secrets.testnetDeployerPk]
    },
  },
};

export default config;
