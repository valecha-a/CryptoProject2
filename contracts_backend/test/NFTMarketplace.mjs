import hardhat from 'hardhat';
import { expect } from 'chai';
const { ethers } = hardhat;

describe("NFTMarketplace", function () {
    it("Should deploy the contract and check initial state", async function () {
        const [deployer] = await ethers.getSigners();

        // Deploy the NFTMarketplace contract
        const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        const nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.deployed();

        // Check the deployer's balance
        const balance = await deployer.getBalance();
        console.log(`Deployer's balance: ${ethers.utils.formatEther(balance)} ETH`);

        // Verify the contract owner
        const owner = await nftMarketplace.owner();
        expect(owner).to.equal(deployer.address);

        // Check collections
        const collections = await nftMarketplace.getAllCollections();
        console.log("Collections:", collections);
    });
});
