// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// const FormData = require('form-data'); // Use form-data package

// const pinataApiKey = process.env.PINATA_API_KEY;
// const pinataSecretApiKey = process.env.PINATA_SECRET_KEY;

// async function pinToPinata(sourcePath) {
//   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

//   const data = new FormData();
//   data.append('file', fs.createReadStream(sourcePath));

//   const headers = {
//     ...data.getHeaders(),
//     'pinata_api_key': pinataApiKey,
//     'pinata_secret_api_key': pinataSecretApiKey,
//   };

//   try {
//     const response = await axios.post(url, data, { headers });
//     console.log('Pinata Response:', response.data);
//   } catch (error) {
//     console.error('Error pinning to Pinata:', error);
//   }
// }

// const directoryPath = path.join(__dirname, '../contracts_frontend/build');

// if (fs.existsSync(directoryPath)) {
//   fs.readdirSync(directoryPath).forEach((file) => {
//     const filePath = path.join(directoryPath, file);
//     if (fs.statSync(filePath).isFile()) { // Check if it's a file
//       pinToPinata(filePath);
//     }
//   });
// } else {
//   console.error('Directory not found:', directoryPath);
// }

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const FormData = require('form-data'); // Use form-data package

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_KEY;

if (!pinataApiKey || !pinataSecretApiKey) {
  console.error('Pinata API key or secret is missing. Please check your .env file.');
  process.exit(1);
}

async function pinToPinata(sourcePath) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const data = new FormData();
  data.append('file', fs.createReadStream(sourcePath));

  const headers = {
    ...data.getHeaders(),
    'pinata_api_key': pinataApiKey,
    'pinata_secret_api_key': pinataSecretApiKey,
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log(`Successfully pinned ${sourcePath} to Pinata. CID: ${response.data.IpfsHash}`);
  } catch (error) {
    console.error(`Error pinning ${sourcePath} to Pinata:`, error.message);
  }
}

const directoryPath = path.join(__dirname, '../contracts_frontend/build');

if (fs.existsSync(directoryPath)) {
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isFile()) { // Check if it's a file
      pinToPinata(filePath);
    }
  });
} else {
  console.error('Directory not found:', directoryPath);
}