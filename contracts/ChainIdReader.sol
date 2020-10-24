/* SPDX-License-Identifier: MIT */
pragma solidity ^0.7.0;

contract ChainIdReader {
    event GetChainId(uint256 chainId);

    function getChainId() external pure returns (uint256) {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
        return chainId;
    }
}
