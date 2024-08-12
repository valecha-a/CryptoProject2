// Part A working code:
//my-nft-marketplace/contracts_backend/hardhat.config.js
require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

const { PRIVATE_KEY, ALCHEMY_API_URL } = process.env;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "src",
    artifacts: "./artifacts/contracts",
  },
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      timeout: 200000,
    },
  },
};
