//my-nft-marketplace/contracts_backend/scripts/interactWithContract.js

const { ethers } = require("hardhat");

async function main() {
    const nftMarketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = NFTMarketplace.attach(nftMarketplaceAddress);

    // Example: Fetch NFTs by owner
    const ownerAddress = "0xYourOwnerAddressHere"; // Replace with actual owner address
    const nftsByOwner = await nftMarketplace.getNFTsByOwner(ownerAddress);
    console.log("NFTs owned by the address:", nftsByOwner);
}

main().catch(console.error);


