// require('dotenv').config();
// const { ethers } = require("hardhat");

// async function main() {
//     const [deployer] = await ethers.getSigners();

//     console.log("Deploying contracts with the account:", deployer.address);

//     try {
//         const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
//         const nftMarketplace = await NFTMarketplace.deploy();

//         await nftMarketplace.deployed();

//         console.log("NFTMarketplace deployed to:", nftMarketplace.address);
//     } catch (error) {
//         console.error("Error deploying contract:", error);
//     }
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error("Unhandled error during deployment:", error);
//         process.exit(1);
//     });


// require('dotenv').config();
// const { ethers } = require('hardhat');

// async function main() {
//     const [deployer] = await ethers.getSigners();

//     console.log("Deploying contracts with the account:", deployer.address);

//     const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    
//     // Define gas settings
//     const gasLimit = 6000000; // Increase gas limit as needed

//     try {
//         const nftMarketplace = await NFTMarketplace.deploy({
//             gasLimit: gasLimit, // Set the gas limit
//         });

//         await nftMarketplace.deployed();

//         console.log("NFTMarketplace deployed to:", nftMarketplace.address);
//     } catch (error) {
//         console.error("Error deploying contract:", error);
//     }
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error("Unhandled error during deployment:", error);
//         process.exit(1);
//     });

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Check and log the deployer's balance
    const balance = await deployer.getBalance();
    console.log(`Deployer's balance: ${ethers.utils.formatEther(balance)} ETH`);

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    
    // Define gas settings
    const gasLimit = 5000000; // Increase if needed
    const gasPrice = ethers.utils.parseUnits('20', 'gwei'); // Higher gas price for faster transactions

    console.log("Deploying contract...");

    try {
        const nftMarketplace = await NFTMarketplace.deploy({
            gasLimit: gasLimit,
            gasPrice: gasPrice,
        });

        console.log("Waiting for deployment to complete...");
        await nftMarketplace.deployed();

        console.log("NFTMarketplace deployed to:", nftMarketplace.address);
    } catch (error) {
        console.error("Error deploying contract:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Unhandled error during deployment:", error);
        process.exit(1);
    });
