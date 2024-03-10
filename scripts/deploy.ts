import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";
import {CoinFlipper} from "../typechain-types";
import {ethers, upgrades} from "hardhat";

async function main() {
	const owner = (await ethers.getSigners())[0];
	const degenToken = "0x0000000000000000000000000000000000000000";
	const SaigonVRF = "0xa60c1e07fa030e4b49eb54950adb298ab94dd312";
	const CF = await ethers.getContractFactory("CoinFlipper");
	const cf = (await upgrades.deployProxy(CF, [
		owner.address,
		SaigonVRF,
		degenToken,
	])) as any as CoinFlipper;
	await cf.waitForDeployment();
	console.log("coinflip deployed to:", await cf.getAddress());

	await addRonConfig(cf, owner);
	console.log("updated Ron config");
	console.log("funding contract for VRF payments");
	await owner.sendTransaction({
		to: cf.getAddress(),
		value: ethers.parseEther("2"),
	});

	return 1;
}

async function addRonConfig(cf: CoinFlipper, owner: HardhatEthersSigner) {
	const id = 0;
	const config = configs[id];

	await cf.updateCoinFlipConfigs([id], [config]);

	// fund contract for this config
	await owner.sendTransaction({
		to: cf.getAddress(),
		value: config.tokenAmount * config.supply,
	});

	return id;
}

const configs = [
	{
		tokenType: 1,
		tokenAddress: "0x0000000000000000000000000000000000000000",
		tokenId: 0,
		tokenAmount: ethers.toBigInt(ethers.parseEther("0.1")),
		supply: ethers.toBigInt(20),
	},
	{
		tokenType: 20,
		tokenAddress: "",
		tokenId: 0,
		tokenAmount: ethers.toBigInt(ethers.parseEther("1")),
		supply: ethers.toBigInt(100),
	},
	{
		tokenType: 721,
		tokenAddress: "",
		tokenId: 0,
		tokenAmount: ethers.toBigInt("1"),
		supply: ethers.toBigInt(50),
	},
];

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
