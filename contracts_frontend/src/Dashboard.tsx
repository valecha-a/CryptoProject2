//my-nft-marketplace/my-nft-client/src/Dashboard.tsx

import { useState } from 'react';
import Web3 from 'web3';
import { Box, Button, TextField, Typography } from '@mui/material';
import NFTMarketplace from './utils/NFTMarketplace.json'; // Ensure this path is correct

const web3 = new Web3(window.ethereum);

export default function Dashboard(): JSX.Element {
  const [collectionName, setCollectionName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const deployContract = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const factory = new web3.eth.Contract(NFTMarketplace.abi);
      const deployTx = factory.deploy({
        data: NFTMarketplace.bytecode,
      }).encodeABI();

      const txResponse = await web3.eth.sendTransaction({
        from: account,
        data: deployTx,
        gas: '5000000',
        gasPrice: web3.utils.toWei('20', 'gwei')
      });

      console.log("Deployment transaction hash:", txResponse.transactionHash);

      const receipt = await web3.eth.getTransactionReceipt(txResponse.transactionHash);
      if (!receipt) {
        throw new Error("Deployment transaction receipt is null");
      }
      console.log("Deployment transaction receipt:", receipt);

      // Safely handle the contract address
      const address = receipt.contractAddress || null;
      setContractAddress(address);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  return (
    <Box>
      <TextField
        label="Collection Name"
        variant="outlined"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Symbol"
        variant="outlined"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={deployContract}>Deploy Contract</Button>
      {contractAddress && (
        <Typography variant="h6" mt={2}>
          Contract deployed at: <a href={`https://sepolia.etherscan.io/address/${contractAddress}`} target="_blank" rel="noopener noreferrer">{contractAddress}</a>
        </Typography>
      )}
    </Box>
  );
}
