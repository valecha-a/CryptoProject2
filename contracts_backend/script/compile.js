async function main() {
    const { ethers, run } = require("hardhat");

    const paths = [
        "./src/Counter.sol",
        "./src/NFTMarketplace.sol",
    ];

    await run("compile", { paths });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
