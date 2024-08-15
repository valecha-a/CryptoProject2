// // Part A working code:
// // src/components/UploadMetadata.tsx 

// import React, { useState } from 'react';
// import axios from 'axios';

// interface UploadMetadataProps {
//   collectionName: string;
//   symbol: string;
//   imageIpfsHash: string | null; // Allow null here
//   onMetadataUpload: (metadataIpfsHash: string) => void;
// }

// const UploadMetadata: React.FC<UploadMetadataProps> = ({
//   collectionName,
//   symbol,
//   imageIpfsHash,
//   onMetadataUpload,
// }) => {
//   const [metadataName, setMetadataName] = useState<string>('');
//   const [metadataDescription, setMetadataDescription] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleUploadMetadata = async () => {
//     if (!imageIpfsHash) {
//       setError('Image IPFS Hash is required.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const metadata = {
//       name: metadataName,
//       description: metadataDescription,
//       image: `https://ipfs.io/ipfs/${imageIpfsHash}`,
//       collectionName,
//       symbol,
//     };

//     const pinataOptions = {
//       pinataMetadata: {
//         name: metadataName,  // This will set the file name in Pinata
//       },
//       pinataContent: metadata,
//     };

//     try {
//       const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', pinataOptions, {
//         headers: {
//           'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY!,
//           'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY!,
//           'Content-Type': 'application/json',
//         },
//       });

//       const metadataIpfsHash = response.data.IpfsHash;
//       onMetadataUpload(metadataIpfsHash);
//     } catch (error) {
//       setError('Error uploading metadata');
//       console.error('Error uploading metadata:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Name"
//         value={metadataName}
//         onChange={(e) => setMetadataName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Description"
//         value={metadataDescription}
//         onChange={(e) => setMetadataDescription(e.target.value)}
//       />
//       <button onClick={handleUploadMetadata} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload Metadata'}
//       </button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default UploadMetadata;






// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography } from '@mui/material';
// import axios from 'axios';

// interface UploadMetadataProps {
//   onUpload: (ipfsHash: string) => void; // Function to trigger after uploading metadata
// }

// const UploadMetadata: React.FC<UploadMetadataProps> = ({ onUpload }) => {
//   const [name, setName] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [imageIpfsHash, setImageIpfsHash] = useState<string>('');
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   const handleUpload = async () => {
//     setIsUploading(true);
//     const metadata = {
//       name,
//       description,
//       image: `https://ipfs.io/ipfs/${imageIpfsHash}`,
//     };

//     try {
//       const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
//         headers: {
//           'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY || '',
//           'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY || '',
//         },
//       });

//       const ipfsHash = response.data.IpfsHash;
//       onUpload(ipfsHash); // Trigger the parent component with the new IPFS hash
//       console.log('Metadata uploaded:', ipfsHash);
//     } catch (error: any) {
//       console.error('Error uploading metadata:', error.message);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h6">Upload Metadata</Typography>
//       <TextField
//         label="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Image IPFS Hash"
//         value={imageIpfsHash}
//         onChange={(e) => setImageIpfsHash(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" color="primary" onClick={handleUpload} disabled={isUploading}>
//         {isUploading ? 'Uploading...' : 'Upload Metadata'}
//       </Button>
//     </Box>
//   );
// };

// export default UploadMetadata;



//  import React, { useState } from 'react';
// import axios from 'axios';

// interface UploadMetadataProps {
//   collectionName: string;
//   symbol: string;
//   imageIpfsHash: string | null; // Allow null here
//   onMetadataUpload: (metadataIpfsHash: string) => void;
// }

// const UploadMetadata: React.FC<UploadMetadataProps> = ({
//   collectionName,
//   symbol,
//   imageIpfsHash,
//   onMetadataUpload,
// }) => {
//   const [metadataName, setMetadataName] = useState<string>('');
//   const [metadataDescription, setMetadataDescription] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleUploadMetadata = async () => {
//     if (!imageIpfsHash) {
//       setError('Image IPFS Hash is required.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const metadata = {
//       name: metadataName,
//       description: metadataDescription,
//       image: `https://ipfs.io/ipfs/${imageIpfsHash}`,
//       collectionName,
//       symbol,
//     };

//     const pinataOptions = {
//       pinataMetadata: {
//         name: metadataName,  // This will set the file name in Pinata
//       },
//       pinataContent: metadata,
//     };

//     try {
//       const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', pinataOptions, {
//         headers: {
//           'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY!,
//           'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY!,
//           'Content-Type': 'application/json',
//         },
//       });

//       const metadataIpfsHash = response.data.IpfsHash;
//       onMetadataUpload(metadataIpfsHash);
//     } catch (error) {
//       setError('Error uploading metadata');
//       console.error('Error uploading metadata:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Name"
//         value={metadataName}
//         onChange={(e) => setMetadataName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Description"
//         value={metadataDescription}
//         onChange={(e) => setMetadataDescription(e.target.value)}
//       />
//       <button onClick={handleUploadMetadata} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload Metadata'}
//       </button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default UploadMetadata;




//Part B working code

import React, { useState } from 'react';
import axios from 'axios';

interface UploadMetadataProps {
  collectionName: string;
  symbol: string;
  imageIpfsHash: string | null; // Allow null here
  onMetadataUpload: (metadataIpfsHash: string) => void;
}

const UploadMetadata: React.FC<UploadMetadataProps> = ({
  collectionName,
  symbol,
  imageIpfsHash,
  onMetadataUpload,
}) => {
  const [metadataName, setMetadataName] = useState<string>('');
  const [metadataDescription, setMetadataDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadMetadata = async () => {
    if (!imageIpfsHash) {
      setError('Image IPFS Hash is required.');
      return;
    }

    setLoading(true);
    setError(null);

    const metadata = {
      name: metadataName,
      description: metadataDescription,
      image: `https://ipfs.io/ipfs/${imageIpfsHash}`,
      collectionName,
      symbol,
    };

    const pinataOptions = {
      pinataMetadata: {
        name: metadataName,  // This will set the file name in Pinata
      },
      pinataContent: metadata,
    };

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', pinataOptions, {
        headers: {
          'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY!,
          'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY!,
          'Content-Type': 'application/json',
        },
      });

      const metadataIpfsHash = response.data.IpfsHash;
      onMetadataUpload(metadataIpfsHash);
    } catch (error) {
      setError('Error uploading metadata');
      console.error('Error uploading metadata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={metadataName}
        onChange={(e) => setMetadataName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={metadataDescription}
        onChange={(e) => setMetadataDescription(e.target.value)}
      />
      <button onClick={handleUploadMetadata} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Metadata'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UploadMetadata;
