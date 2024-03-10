// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeERC20 is ERC20 {
	constructor() ERC20("Test Token", "TST") {
		_mint(msg.sender, 10000 * 1e18);
	}
}
