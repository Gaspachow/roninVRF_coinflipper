// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FakeERC721 is ERC721Enumerable {
	constructor() ERC721("Test Token", "TST") {
		for (uint256 i = 1; i <= 100; i += 1) {
			_mint(msg.sender, i);
		}
	}
}
