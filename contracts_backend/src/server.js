//my-nft-marketplace/contracts_backend/src/server.js

const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create an instance of the JsonRpcProvider
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);

// Your other server code...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
