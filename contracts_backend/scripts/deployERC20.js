require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying ERC20 token with the account:", deployer.address);

    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 million tokens
    const erc20Token = await ERC20Token.deploy(initialSupply);

    await erc20Token.deployed();
    console.log("ERC20 Token deployed to:", erc20Token.address);

    // Save the ERC20 token address for use in other deployments
    fs.writeFileSync('.env', `ERC20_TOKEN_ADDRESS=${erc20Token.address}\n`, { flag: 'a' });
    console.log("ERC20 token address saved to .env file.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Unhandled error during deployment:", error);
        process.exit(1);
    });
