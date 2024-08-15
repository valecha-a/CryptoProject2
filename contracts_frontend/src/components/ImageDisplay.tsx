// // Part A working code:
// //my-nft-marketplace/contracts_frontend/src/components/ImageDisplay.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Paper } from '@mui/material';


// const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// const ImageDisplay: React.FC = () => {
//   const [nfts, setNfts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchNfts = async () => {
//       const response = await axios.get('/api/nfts'); 
//       const nftsWithThrottling = [];
//       for (const nft of response.data) {
//         await delay(1000); 
//         nftsWithThrottling.push(nft);
//       }
//       setNfts(nftsWithThrottling);
//     };

//     fetchNfts();
//   }, []);

//   return (
//     <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//       {nfts.map((nft) => (
//         <Paper key={nft.id} sx={{ width: '200px', margin: '10px', padding: '10px' }}>
//           <img src={`https://ipfs.io/ipfs/${nft.imageHash}`} alt={nft.name} style={{ width: '100%' }} /> {/* Switched to public IPFS gateway */}
//           <p>{nft.name}</p>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default ImageDisplay;




// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';

// interface ImageDisplayProps {
//   imageIpfsHash: string;
//   onMint: () => void; // Function to trigger minting, possibly with ERC20 token payment
//   isMinting: boolean;
// }

// const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageIpfsHash, onMint, isMinting }) => {
//   return (
//     <Box textAlign="center">
//       <Typography variant="h6">NFT Image</Typography>
//       <img src={`https://ipfs.io/ipfs/${imageIpfsHash}`} alt="NFT" style={{ maxWidth: '100%', height: 'auto' }} />
//       <Box mt={2}>
//         <Button variant="contained" color="primary" onClick={onMint} disabled={isMinting}>
//           {isMinting ? 'Minting...' : 'Mint NFT'}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ImageDisplay;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Paper } from '@mui/material';


// const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// const ImageDisplay: React.FC = () => {
//   const [nfts, setNfts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchNfts = async () => {
//       const response = await axios.get('/api/nfts'); 
//       const nftsWithThrottling = [];
//       for (const nft of response.data) {
//         await delay(1000); 
//         nftsWithThrottling.push(nft);
//       }
//       setNfts(nftsWithThrottling);
//     };

//     fetchNfts();
//   }, []);

//   return (
//     <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//       {nfts.map((nft) => (
//         <Paper key={nft.id} sx={{ width: '200px', margin: '10px', padding: '10px' }}>
//           <img src={`https://ipfs.io/ipfs/${nft.imageHash}`} alt={nft.name} style={{ width: '100%' }} /> {/* Switched to public IPFS gateway */}
//           <p>{nft.name}</p>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default ImageDisplay;




// Part B code working
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper } from '@mui/material';


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const ImageDisplay: React.FC = () => {
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    const fetchNfts = async () => {
      const response = await axios.get('/api/nfts'); 
      const nftsWithThrottling = [];
      for (const nft of response.data) {
        await delay(1000); 
        nftsWithThrottling.push(nft);
      }
      setNfts(nftsWithThrottling);
    };

    fetchNfts();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {nfts.map((nft) => (
        <Paper key={nft.id} sx={{ width: '200px', margin: '10px', padding: '10px' }}>
          <img src={`https://ipfs.io/ipfs/${nft.imageHash}`} alt={nft.name} style={{ width: '100%' }} /> {/* Switched to public IPFS gateway */}
          <p>{nft.name}</p>
        </Paper>
      ))}
    </Box>
  );
};

export default ImageDisplay;
