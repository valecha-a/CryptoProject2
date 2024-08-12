// working code complete part A

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Grid, Paper } from '@mui/material';
import Web3 from 'web3';
import NFTCollectionABI from '../utils/NFTCollectionContract.json';
import NFTMarketplaceABI from '../utils/NFTMarketplace.json';
import ImageUpload from './ImageUpload';
import UploadMetadata from './UploadMetadata';
import Collection from './Collection';
import { NFTMarketplaceAddress } from '../utils/contractAddresses';

const web3 = new Web3(window.ethereum);

interface Collection {
  id: string;
  name: string;
  symbol: string;
  imageHash: string;
}

export default function Dashboard(): JSX.Element {
  const [collectionName, setCollectionName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [imageIpfsHash, setImageIpfsHashState] = useState<string | null>(null);
  const [metadataIpfsHash, setMetadataIpfsHash] = useState<string | null>(null);
  const [metadataUploaded, setMetadataUploaded] = useState<boolean>(false);
  const [deploymentHash, setDeploymentHash] = useState<string | null>(null);
  const [deploymentReceipt, setDeploymentReceipt] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState<boolean>(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isCreatingCollection, setIsCreatingCollection] = useState<boolean>(false); 
  const [isCollectionCreated, setIsCollectionCreated] = useState<boolean>(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsMetaMaskConnected(true);
            fetchCollections();  // Fetch collections when MetaMask is connected
          } else {
            setIsMetaMaskConnected(false);
          }
        } catch (error) {
          console.error('Error requesting accounts:', error);
          setIsMetaMaskConnected(false);
        }
      } else {
        console.error('MetaMask is not installed');
        setIsMetaMaskConnected(false);
      }
    };

    checkWalletConnection();
  }, []);

  const startCollectionProcess = () => {
    setIsCreatingCollection(true);  // Start the collection creation process
  };

  const handleCollectionDetailsChange = (name: string, symbol: string) => {
    setCollectionName(name);
    setSymbol(symbol);
    console.log(`Collection details updated: Name - ${name}, Symbol - ${symbol}`);
  };

  const handleImageUpload = (ipfsHash: string, metadata: any) => {
    setImageIpfsHashState(ipfsHash);
    console.log(`Image uploaded with IPFS hash: ${ipfsHash}`);
  };

  const handleMetadataUpload = async (metadataIpfsHash: string) => {
    setMetadataUploaded(true);
    setMetadataIpfsHash(metadataIpfsHash);
    console.log(`Metadata uploaded with IPFS hash: ${metadataIpfsHash}`);
  };

  const createCollection = async () => {
    console.log("Attempting to create collection...");
    console.log("Collection Name:", collectionName);
    console.log("Symbol:", symbol);
    console.log("Image IPFS Hash:", imageIpfsHash);
    console.log("Account:", account);

    if (!account) {
      console.error('No account connected. Please connect MetaMask.');
      return;
    }

    if (!collectionName || !symbol || !imageIpfsHash) {
      console.error('Please provide all required details: collection name, symbol, and image IPFS hash.');
      return;
    }

    try {
      const marketplace = new web3.eth.Contract(NFTMarketplaceABI.abi, NFTMarketplaceAddress);
      const tx = await marketplace.methods.createCollection(collectionName, symbol, imageIpfsHash).send({ from: account });

      console.log("Collection created. Transaction:", tx);
      setIsCollectionCreated(true); // Mark collection as created
    } catch (error: any) {
      console.error("Error creating collection:", error.message);
    }
  };

  const deployContract = async () => {
    console.log("Attempting to deploy contract...");
    console.log("Collection Name:", collectionName);
    console.log("Symbol:", symbol);
    console.log("Image IPFS Hash:", imageIpfsHash);
    console.log("Account:", account);

    if (!account) {
      console.error('No account connected. Please connect MetaMask.');
      return;
    }

    if (!collectionName || !symbol || !imageIpfsHash) {
      console.error('Please provide all required details: collection name, symbol, and image IPFS hash.');
      return;
    }

    try {
      const factory = new web3.eth.Contract(NFTCollectionABI.abi);
      const deployTx = factory.deploy({
        data: NFTCollectionABI.bytecode,
        arguments: [collectionName, symbol, account],
      }).encodeABI();

      const estimatedGas = await web3.eth.estimateGas({ data: deployTx });
      const additionalGas = 10000;
      const totalGas = (BigInt(estimatedGas) + BigInt(additionalGas)).toString();

      console.log(`Deploying contract...`);
      const txResponse = await web3.eth.sendTransaction({
        from: account,
        data: deployTx,
        gas: totalGas,
        gasPrice: web3.utils.toWei('20', 'gwei'),
      });

      console.log(`Deployment transaction hash: ${txResponse.transactionHash}`);
      setDeploymentHash(txResponse.transactionHash as string);

      let receipt = null;
      while (receipt === null) {
        console.log("Waiting for transaction to be mined...");
        receipt = await web3.eth.getTransactionReceipt(txResponse.transactionHash);
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
      }

      console.log(`Transaction mined. Receipt:`, receipt);
      setDeploymentReceipt(receipt);

      const address = receipt.contractAddress || null;
      setContractAddress(address);

      if (address) {
        console.log(`Contract deployed at address: ${address}`);
      } else {
        console.error("Failed to get contract address from deployment receipt.");
      }

    } catch (error: any) {
      console.error("Error deploying contract:", error.message);
    }
  };

  const mintNFT = async () => {
    console.log("Mint NFT function called.");
    console.log("Contract Address:", contractAddress);
    console.log("Account:", account);
    console.log("Metadata IPFS Hash:", metadataIpfsHash);
  
    if (!contractAddress || !account || !metadataIpfsHash) {
      console.error('Required data missing: contractAddress, account, or metadataIpfsHash');
      return;
    }
  
    const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, contractAddress);
    const price = web3.utils.toWei('0.1', 'ether');
  
    try {
      console.log(`Minting NFT with metadata IPFS hash: ${metadataIpfsHash}`);
      setIsMinting(true);
  
      // Call the mintNFT function from the contract
      const tx = await nftCollectionContract.methods.mintNFT(metadataIpfsHash, price).send({ from: account });
  
      const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
      if (!receipt) {
        throw new Error("Transaction receipt is null");
      }
  
      // Convert BigInt values to strings for safe JSON serialization
      const receiptWithStringBigInt = JSON.parse(
        JSON.stringify(receipt, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        )
      );
  
      console.log("Mint NFT transaction receipt:", JSON.stringify(receiptWithStringBigInt, null, 2));
      setDeploymentReceipt(receiptWithStringBigInt);
      setIsMinting(false);
  
      console.log("Successfully Created, Deployed, and Minted Collection!");
      setDeploymentHash("Successfully Created, Deployed, and Minted Collection!");
  
    } catch (error: any) {
      console.error("Error minting NFT:", error.message);
      setIsMinting(false);
    }
  };

  const fetchCollections = async () => {
    console.log('NFT Marketplace Address:', NFTMarketplaceAddress);
  
    if (!NFTMarketplaceAddress) {
      console.error('No contract address provided');
      return;
    }
  
    const provider = new web3.eth.Contract(NFTMarketplaceABI.abi, NFTMarketplaceAddress);
  
    try {
      console.log('Fetching collections from contract ...');
      const collectionsList = await provider.methods.getAllCollections().call();
      console.log('Collections fetched:', collectionsList);
      
      if (Array.isArray(collectionsList)) {
        setCollections([...collectionsList]); // Spread the new collections to trigger re-render
      } else {
        setCollections([]);
      }
    } catch (error: any) {
      console.error("Error fetching collections:", error.message);
    }
  };

  useEffect(() => {
    fetchCollections(); // Fetch collections when the component mounts
  }, []);

  return (
    <Box>
      <Button onClick={fetchCollections} variant="contained" style={{ marginRight: '10px' }}>
        Fetch Collections
      </Button>
      <Button onClick={startCollectionProcess} variant="contained">
        Create New Collection
      </Button>

      {isCreatingCollection && (
        <Box marginTop={3}>
          <TextField
            label="Collection Name"
            variant="outlined"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Symbol"
            variant="outlined"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            fullWidth
            margin="normal"
          />
          {collectionName && symbol && (
            <Box marginTop={2}>
              <Typography variant="body1">Step 1: Upload Image</Typography>
              <ImageUpload onSuccess={handleImageUpload} />
            </Box>
          )}
        </Box>
      )}

      {imageIpfsHash && !metadataUploaded && (
        <Box marginTop={2}>
          <Typography variant="body1">Step 2: Upload Metadata</Typography>
          <UploadMetadata
            collectionName={collectionName}
            symbol={symbol}
            imageIpfsHash={imageIpfsHash}
            onMetadataUpload={handleMetadataUpload}
          />
        </Box>
      )}

      {metadataUploaded && !isCollectionCreated && (
        <Box marginTop={2}>
          <Typography variant="body1">Step 3: Create Collection</Typography>
          <Button onClick={createCollection} variant="contained">
            Create Collection
          </Button>
        </Box>
      )}

      {isCollectionCreated && !deploymentHash && (
        <Box marginTop={2}>
          <Typography variant="body1">Step 4: Deploy Contract</Typography>
          <Button onClick={deployContract} variant="contained">
            Deploy Contract
          </Button>
        </Box>
      )}

      {deploymentHash && !isMinting && (
        <Box marginTop={2}>
          <Typography variant="body1">Deployment Hash: {deploymentHash}</Typography>
          <Typography variant="body1">Step 5: Mint NFT</Typography>
          <Button onClick={mintNFT} variant="contained">
            Mint NFT
          </Button>
        </Box>
      )}

      {deploymentReceipt && (
        <Box marginTop={2}>
          <Typography variant="body1">
            Deployment Receipt:{" "}
            {JSON.stringify(
              deploymentReceipt,
              (key, value) => (typeof value === "bigint" ? value.toString() : value),
              2
            )}
          </Typography>
        </Box>
      )}

      {isMinting && (
        <Typography variant="body1" marginTop={2}>
          Minting in progress...
        </Typography>
      )}

      {deploymentHash === "Successfully Created, Deployed, and Minted Collection!" && (
        <Typography variant="h6" marginTop={3} color="green">
          {deploymentHash}
        </Typography>
      )}

      <Box marginTop={3}>
        <Typography variant="h5">Existing Collections</Typography>
        <Grid container spacing={2} marginTop={3} key={collections.length}>
          {collections.length > 0 &&
            collections.map((collection) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <img
                    src={`https://ipfs.io/ipfs/${collection.imageHash}`}
                    alt={collection.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Typography variant="h6">{collection.name}</Typography>
                  <Typography variant="subtitle1">Symbol: {collection.symbol}</Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}