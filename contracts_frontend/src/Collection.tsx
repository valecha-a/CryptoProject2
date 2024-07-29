//my-nft-marketplace/my-nft-client/src/Collection.tsx

import { useState, useEffect } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { getContract, getSigner } from './ether_utils';
import NFTCollection from './utils/NFTCollectionContract.json';

interface Item {
  id: number;
  owner: string;
  uri: {
    image: string; // Adjust if your metadata has a different structure
    [key: string]: any;
  };
}

export default function Collection(): JSX.Element {
  const location = useLocation();
  const { nft_address } = location.state as { nft_address: string };
  const { name } = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const [metadataUri, setMetadataUri] = useState<string>("");

  const fetchItems = async () => {
    try {
      const account = await getSigner();
      const contract = getContract(nft_address, NFTCollection.abi);

      const items: Item[] = await contract.methods.getAllNFTs().call();

      if (!Array.isArray(items)) {
        throw new Error("Expected items to be an array");
      }

      // Process items
      const itemData = await Promise.all(items.map(async (item: any) => {
        try {
          const metadata = await axios.get(item.uri);
          return {
            id: item.id,
            owner: item.owner,
            uri: metadata.data
          };
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return null;
        }
      }));

      setItems(itemData.filter((item): item is Item => item !== null));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async () => {
    try {
      const account = await getSigner();
      const contract = getContract(nft_address, NFTCollection.abi);
      await contract.methods.createNFT(metadataUri).send({ from: account });
      fetchItems();
      setMetadataUri("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [nft_address]); // Add dependency on nft_address

  return (
    <Box>
      <h2>{name}</h2>
      <TextField
        label="Item Metadata URI"
        variant="outlined"
        value={metadataUri}
        onChange={(e) => setMetadataUri(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={addItem}>Add Item</Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map((item) => (
          <Paper key={item.id} sx={{ width: '200px', margin: '10px', padding: '10px' }}>
            <img src={item.uri.image || 'default_image_url'} alt="Item" style={{ width: '100%' }} />
            <p>ID: {item.id}</p>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
