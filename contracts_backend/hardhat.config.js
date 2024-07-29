// require("@nomiclabs/hardhat-waffle");
// require("dotenv").config();

// console.log("ALCHEMY_API_URL:", process.env.ALCHEMY_API_URL);
// console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);

// module.exports = {
//   solidity: {
//     compilers: [
//       {
//         version: "0.8.0",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//       {
//         version: "0.8.7", // Example: Include other required versions
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//       {
//         version: "0.8.9", // Example: Include other required versions
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//       {
//         version: "0.8.20", // Example: Include other required versions
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//     ],
//   },
//   paths: {
//     sources: "src", // Adjust path to your Solidity files
//     artifacts: "./artifacts/contracts", // Adjust path to artifacts directory
//   },
//   networks: {
//     mainnet: {
//       url: process.env.ALCHEMY_API_URL,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//     // Add more networks as needed
//   },
// };


// require("@nomiclabs/hardhat-waffle");
// require("dotenv").config();

// module.exports = {
//   solidity: {
//     compilers: [
//       {
//         version: "0.8.0",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//       {
//         version: "0.8.7",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//       {
//         version: "0.8.9",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//       {
//         version: "0.8.20",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//     ],
//   },
//   paths: {
//     sources: "src",
//     artifacts: "./artifacts/contracts",
//   },
//   networks: {
//     sepolia: {
//       url: process.env.ALCHEMY_API_URL,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//   },
// };


require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

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
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 200000,
    },
  },
};
