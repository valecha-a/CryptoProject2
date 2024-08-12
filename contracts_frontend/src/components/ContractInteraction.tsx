// Part A working code:
// src/components/ContractInteraction.tsx

import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Web3 from 'web3';
import NFTMarketplaceABI from '../utils/NFTMarketplace.json';

interface ContractInteractionProps {
  contractAddress: string;
  account: string;
}

//const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8547');
const web3 = new Web3(window.ethereum);

const ContractInteraction: React.FC<ContractInteractionProps> = ({ contractAddress, account }) => {
  const [result, setResult] = useState<string | null>(null);

  const mintNFT = async () => {
    if (!contractAddress || !account) {
      console.error('Contract address or account is missing');
      return;
    }

    const provider = new web3.eth.Contract(NFTMarketplaceABI.abi, contractAddress);

    try {
      // Fetch the latest token ID from the contract
      const latestTokenId: string = await provider.methods.latestTokenId().call();
      console.log(`Fetched Token ID: ${latestTokenId}`);

      // Fetch the URI for the latest token ID
      const uri: string = await provider.methods.tokenURI(latestTokenId).call();
      console.log(`Fetched Token URI: ${uri}`);

      // Mint the NFT
      const result = await provider.methods.mintNFT(uri).send({ from: account });
      if (result.events && result.events.Transfer) {
        const mintedTokenId = result.events.Transfer.returnValues.tokenId;
        setResult(`Minted NFT with Token ID: ${mintedTokenId}`);
      } else {
        setResult('Minted NFT, but no token ID was returned.');
      }
    } catch (error: any) {
      setResult(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div>
      <Typography variant="h6">Mint Contract</Typography>
      <Button variant="contained" onClick={mintNFT}>Mint NFT</Button>
      {result && <Typography>{result}</Typography>}
    </div>
  );
};

export default ContractInteraction;
