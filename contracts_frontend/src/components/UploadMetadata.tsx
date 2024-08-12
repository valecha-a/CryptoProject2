// Part A working code:
// src/components/UploadMetadata.tsx 

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