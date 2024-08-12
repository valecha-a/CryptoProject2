const Web3 = require('web3');

// Initialize Web3 with a provider URL
const web3 = new Web3('http://localhost:8545'); // Update with your provider

// Replace with your contract ABI and address
const contractABI = [ /* Replace with your ABI */ ];
const contractAddress = '0xa740eeccebbb610e4ab47954112533b934c0a29a'; // Replace with your contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function test() {
  try {
    const collections = await contract.methods.getAllCollections().call();
    console.log('Collections:', collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
  }
}

test();
