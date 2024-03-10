import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";
import {CoinFlipper} from "../typechain-types";
import {ethers, upgrades} from "hardhat";

async function main() {
	const myAddress = (await ethers.getSigners())[0].address;
	const cfAddress = "0xb154a4ed28d820949d4d3bf647c27b55ede31996";
	const CF = await ethers.getContractFactory("CoinFlipper");
	const cf = CF.attach(cfAddress) as any as CoinFlipper;

	console.log("testing contract");
	const config = await cf.coinFlipConfigs(0);
	console.log(config);

	console.log(
		"flipping coin | Balance is:",
		ethers.formatEther(await ethers.provider.getBalance(myAddress))
	);
	const hash = await cf.flipACoin(true, 0, 0, {value: config.tokenAmount});
	console.log(
		"coin flipped | Balance is:",
		ethers.formatEther(await ethers.provider.getBalance(myAddress))
	);

	console.log(hash, hash.value);

	return 1;
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
