// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Meta{

    mapping(address => uint256) public nonces;


  function executeMetaTransaction(
        address user,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public payable returns (bytes memory) {
        require(verifySignature(user, functionSignature, nonces[user], sigR, sigS, sigV), "Invalid signature");

        nonces[user]++;

        (bool success, bytes memory result) = address(this).call(functionSignature);
        require(success, "Function call failed");

        return result;
    }

    function verifySignature(
        address user,
        bytes memory functionSignature,
        uint256 nonce,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public pure returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(user, functionSignature, nonce));
        address signer = ecrecover(messageHash, sigV, sigR, sigS);
        return signer == user;
    }

    function getNonce(address user) public view returns (uint256) {
        return nonces[user];
    }
}