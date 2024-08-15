// // Part A working code:
// // src/components/Collections.tsx  

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Grid, Paper } from '@mui/material';
// import Web3 from 'web3';
// import NFTMarketplaceABI from '../utils/NFTMarketplace.json';
// import { NFTMarketplaceAddress } from '../utils/contractAddresses';

// const web3 = new Web3(window.ethereum);

// interface Collection {
//   id: string;
//   name: string;
//   symbol: string;
//   imageHash: string;
// }

// interface CollectionComponentProps {
//   imageIpfsHash: string | null;
//   onCollectionDetailsChange: (name: string, symbol: string) => void;
// }

// const CollectionComponent: React.FC<CollectionComponentProps> = ({ imageIpfsHash, onCollectionDetailsChange }) => {
//   const [collections, setCollections] = useState<Collection[]>([]);

//   useEffect(() => {
//     const fetchCollections = async () => {
//       if (!NFTMarketplaceAddress) {
//         console.error('No contract address provided');
//         return;
//       }
//       const provider = new web3.eth.Contract(NFTMarketplaceABI.abi, NFTMarketplaceAddress);
//       try {
//         console.log('Fetching collections from contract ...');
//         const collectionsList = await provider.methods.getAllCollections().call();
//         console.log('Collections fetched:', collectionsList);
//         if (Array.isArray(collectionsList)) {
//           setCollections(collectionsList.map((collection: any) => ({
//             id: collection.id || collection[0],
//             name: collection.name || collection[1],
//             symbol: collection.symbol || collection[2],
//             imageHash: collection.imageHash || collection[3]
//           })));
//         } else {
//           setCollections([]);
//         }
//       } catch (error: any) {
//         console.error("Error fetching collections:", error.message);
//       }
//     };

//     fetchCollections();
//   }, []);

//   return (
//     <Box>
//       <Grid container spacing={2} marginTop={3}>
//         {collections.length > 0 && collections.map((collection) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
//             <Paper elevation={3} style={{ padding: '10px' }}>
//               <img
//                 src={`https://ipfs.io/ipfs/${collection.imageHash}`}
//                 alt={collection.name}
//                 style={{ width: '100%', height: 'auto' }}
//               />
//                 <Typography variant="h6">{collection.name}</Typography>
//               <Typography variant="subtitle1">Symbol: {collection.symbol}</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default CollectionComponent;




// // // src/components/Collections.tsx 
// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, Grid, Paper } from '@mui/material';
// import Web3 from 'web3';
// import NFTCollectionABI from '../utils/NFTCollectionContract.json';
// import ERC20ABI from '../utils/ERC20Token/ERC20Token.json';

// interface CollectionProps {
//   collectionAddress: string;
//   account: string;
// }

// const web3 = new Web3(window.ethereum);

// const Collection: React.FC<CollectionProps> = ({ collectionAddress, account }) => {
//   const [nfts, setNfts] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchNFTs = async () => {
//       try {
//         const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, collectionAddress);
//         const nftsData = await nftCollectionContract.methods.getAllNFTs().call();
//         if (nftsData && Array.isArray(nftsData)) {
//           setNfts(nftsData);
//         } else {
//           setNfts([]); // Ensure it's an empty array if the data is invalid
//         }
//       } catch (error) {
//         console.error('Error fetching NFTs:', error);
//         setNfts([]); // Set to an empty array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (collectionAddress) {
//       fetchNFTs(); // Call with the correct argument
//     }
//   }, [collectionAddress]);

//   const buyNFT = async (nftId: number, price: string) => {
//     if (!collectionAddress || !account) {
//       console.error('Contract address or account is missing');
//       return;
//     }

//     const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, collectionAddress);
//     const erc20TokenContract = new web3.eth.Contract(ERC20ABI.abi, process.env.REACT_APP_ERC20_TOKEN_ADDRESS);

//     try {
//       // Approve the ERC20 token transfer
//       await erc20TokenContract.methods.approve(collectionAddress, price).send({ from: account });

//       // Buy the NFT
//       const tx = await nftCollectionContract.methods.buyNFT(nftId).send({ from: account });
//       console.log("NFT bought. Transaction:", tx);
//     } catch (error: any) {
//       console.error("Error buying NFT:", error.message);
//     }
//   };

//   if (loading) {
//     return <Typography>Loading NFTs...</Typography>;
//   }

//   if (nfts.length === 0) {
//     return <Typography>No NFTs found in this collection.</Typography>;
//   }

//   return (
//     <Box p={3}>
//       <Typography variant="h5">NFTs in Collection</Typography>
//       <Grid container spacing={2}>
//         {nfts.map((nft) => (
//           <Grid item xs={12} md={4} key={nft.id}>
//             <Paper elevation={3} style={{ padding: '16px' }}>
//               <Typography variant="h6">NFT #{nft.id}</Typography>
//               <Typography>Price: {web3.utils.fromWei(nft.price, 'ether')} ERC20 Tokens</Typography>
//               <img src={`https://ipfs.io/ipfs/${nft.uri}`} alt={`NFT ${nft.id}`} style={{ maxWidth: '100%' }} />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => buyNFT(nft.id, nft.price)}
//                 disabled={nft.owner === account}  // Disable if the user already owns the NFT
//               >
//                 {nft.owner === account ? 'You Own This NFT' : 'Buy NFT'}
//               </Button>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Collection;





// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Grid, Paper, Button } from '@mui/material';
// import Web3 from 'web3';
// import NFTCollectionABI from '../utils/NFTCollectionContract.json';
// import ERC20ABI from '../utils/ERC20Token/ERC20Token.json';

// interface CollectionProps {
//   collectionAddress: string;
//   account: string;
// }

// const web3 = new Web3(window.ethereum);

// const Collection: React.FC<CollectionProps> = ({ collectionAddress, account }) => {
//   const [nfts, setNfts] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchNFTs = async () => {
//     try {
//       const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, collectionAddress);
//       const nftsData = await nftCollectionContract.methods.getAllNFTs().call();
//       if (nftsData && Array.isArray(nftsData)) {
//         setNfts(nftsData);
//       } else {
//         setNfts([]); // Ensure it's an empty array if the data is invalid
//       }
//     } catch (error) {
//       console.error('Error fetching NFTs:', error);
//       setNfts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (collectionAddress) {
//       fetchNFTs();
//     }
//   }, [collectionAddress]);

//   const buyNFT = async (nftId: number, price: string) => {
//     if (!collectionAddress || !account) {
//       console.error('Contract address or account is missing');
//       return;
//     }

//     const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, collectionAddress);
//     const erc20TokenContract = new web3.eth.Contract(ERC20ABI.abi, process.env.REACT_APP_ERC20_TOKEN_ADDRESS);

//     try {
//       // Approve the ERC20 token transfer
//       await erc20TokenContract.methods.approve(collectionAddress, price).send({ from: account });

//       // Buy the NFT
//       const tx = await nftCollectionContract.methods.buyNFT(nftId).send({ from: account });
//       console.log("NFT bought. Transaction:", tx);

//       // Refresh the NFTs after purchase
//       fetchNFTs();
//     } catch (error: any) {
//       console.error("Error buying NFT:", error.message);
//     }
//   };

//   if (loading) {
//     return <Typography>Loading NFTs...</Typography>;
//   }

//   if (nfts.length === 0) {
//     return <Typography>No NFTs found in this collection.</Typography>;
//   }

//   return (
//     <Box p={3}>
//       <Typography variant="h5">NFTs in Collection</Typography>
//       <Grid container spacing={2}>
//         {nfts.map((nft) => (
//           <Grid item xs={12} md={4} key={nft.id}>
//             <Paper elevation={3} style={{ padding: '16px' }}>
//               <Typography variant="h6">NFT #{nft.id}</Typography>
//               <Typography>Price: {web3.utils.fromWei(nft.price, 'ether')} ERC20 Tokens</Typography>
//               <img src={`https://ipfs.io/ipfs/${nft.uri}`} alt={`NFT ${nft.id}`} style={{ maxWidth: '100%' }} />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => buyNFT(nft.id, nft.price)}
//                 disabled={nft.owner === account}  // Disable if the user already owns the NFT
//               >
//                 {nft.owner === account ? 'You Own This NFT' : 'Buy NFT'}
//               </Button>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Collection;


// Part B code working

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