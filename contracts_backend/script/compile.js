async function main() {
    const { ethers, run } = require("hardhat");

    // Specify the paths to your Solidity contracts
    const paths = [
        "./src/Counter.sol",
        "./src/NFTMarketplace.sol",
    ];

    // Run compilation task
    await run("compile", { paths });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
