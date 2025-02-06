require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('hardhat-deploy');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: 'hardhat',
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
      },
        networks: {
            sepolia: {
                url: process.env.SEPOLIA_RPC_URL,
                chainId: parseInt(process.env.SEPOLIA_CHAIN_ID),
                accounts: [process.env.PRIVATE_KEY],
                blockConfirmation: 5,
            },
        },
        etherscan: {
            apiKey: process.env.ETHERSCAN_API_KEY,
        },
        solidity: '0.8.7',
        gasReporter: {
            enabled: true,
            currency: 'USD',
        },
};
