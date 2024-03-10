// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./CoinFlipper.sol";

contract CoinFlipperLocal is CoinFlipper {
	function flipACoin(
		bool _choice,
		uint16 _configId,
		uint256 _nftId // 0 for any other type than 721
	) external payable override returns (bytes32) {
		CoinFlipConfig storage config = coinFlipConfigs[_configId];
		require(!coinFlipPaused, "coin flips are paused");
		require(config.supply != 0, "supply empty");
		if (config.tokenType == 1) {
			require(address(this).balance > config.tokenAmount);
		}

		_takeAsset(config, _nftId);

		config.supply -= 1;

		// TODO: Uncomment bellow before deploying
		// uint256 value = IRoninVRFCoordinatorForConsumers(vrfCoordinator)
		// 	.estimateRequestRandomFee(
		// 		500000, // TODO -> need more accurate
		// 		20 gwei
		// 	);

		// bytes32 reqHash = _requestRandomness(value, 500000, 20 gwei, address(this));

		bytes32 reqHash = bytes32(block.timestamp);
		coinFlipData[reqHash] = VRFCoinFlipData(
			false,
			_choice,
			_configId,
			msg.sender,
			_nftId
		);

		// TODO remove below before deploying
		_fulfillRandomSeed(reqHash, uint256(reqHash));

		return reqHash;
	}
}
