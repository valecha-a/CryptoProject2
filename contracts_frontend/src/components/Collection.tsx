// Part A working code:
// src/components/Collections.tsx  

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Web3 from 'web3';
import NFTMarketplaceABI from '../utils/NFTMarketplace.json';
import { NFTMarketplaceAddress } from '../utils/contractAddresses';

const web3 = new Web3(window.ethereum);

interface Collection {
  id: string;
  name: string;
  symbol: string;
  imageHash: string;
}

interface CollectionComponentProps {
  imageIpfsHash: string | null;
  onCollectionDetailsChange: (name: string, symbol: string) => void;
}

const CollectionComponent: React.FC<CollectionComponentProps> = ({ imageIpfsHash, onCollectionDetailsChange }) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
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
          setCollections(collectionsList.map((collection: any) => ({
            id: collection.id || collection[0],
            name: collection.name || collection[1],
            symbol: collection.symbol || collection[2],
            imageHash: collection.imageHash || collection[3]
          })));
        } else {
          setCollections([]);
        }
      } catch (error: any) {
        console.error("Error fetching collections:", error.message);
      }
    };

    fetchCollections();
  }, []);

  return (
    <Box>
      <Grid container spacing={2} marginTop={3}>
        {collections.length > 0 && collections.map((collection) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <img
                src={`https://ipfs.io/ipfs/${collection.imageHash}`}
                alt={collection.name}
                style={{ width: '100%', height: 'auto' }}
              />
                <Typography variant="h6">{collection.name}</Typography>
              <Typography variant="subtitle1">Symbol: {collection.symbol}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CollectionComponent;