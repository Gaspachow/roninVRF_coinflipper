import { ethers } from "hardhat";

async function main() {
  const account = (await ethers.getSigners())[0];

  const balance = await ethers.provider.getBalance(account);
  console.log(balance);
  return;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
