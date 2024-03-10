import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";
import secrets from "./.secrets.json";

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
			accounts: [secrets.testnetDeployerPk],
		},
	},
	sourcify: {
		enabled: true,
		// Optional: specify a different Sourcify server
		apiUrl: "https://sourcify.dev/server",
		// Optional: specify a different Sourcify repository
		browserUrl: "https://repo.sourcify.dev",
	},
};

export default config;
