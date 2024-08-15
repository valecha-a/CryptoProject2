// // Part A & B working code:
// // my-nft-marketplace/contracts_backend/scripts/deploy.js

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Check and log the deployer's balance
    const balance = await deployer.getBalance();
    console.log(`Deployer's balance: ${ethers.utils.formatEther(balance)} ETH`);

    // Deploy NFTMarketplace contract
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy({
        gasLimit: 3000000,
        gasPrice: ethers.utils.parseUnits('20', 'gwei'),
    });
    await nftMarketplace.deployed();
    console.log("NFTMarketplace deployed to:", nftMarketplace.address);

    // Deploy NFTCollectionContract for testing (optional)
    // You can deploy this contract separately or inside the createCollection function in NFTMarketplace
    const NFTCollection = await ethers.getContractFactory("NFTCollectionContract");
    const nftCollection = await NFTCollection.deploy("Test Collection", "TST", deployer.address);
    await nftCollection.deployed();
    console.log("NFTCollectionContract deployed to:", nftCollection.address);

    // Optionally, save the addresses to a file or environment variables
    const fs = require('fs');
    const addresses = {
        nftMarketplace: nftMarketplace.address,
        nftCollection: nftCollection.address,
    };
    fs.writeFileSync('addresses.json', JSON.stringify(addresses, null, 2));

    console.log("Deployment addresses saved to addresses.json");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Unhandled error during deployment:", error);
        process.exit(1);
    });

