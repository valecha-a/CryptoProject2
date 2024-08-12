// Part A working code:
//my-nft-marketplace/contracts_frontend/src/components/ImageUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface ImageUploadProps {
  onSuccess: (ipfsHash: string, metadata: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSuccess }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
        setError('Please select an image file to upload.');
        return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
        console.log('Uploading image to IPFS via Pinata...');
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY!,
                'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY!,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        const ipfsHash = response.data.IpfsHash;
        console.log(`Image successfully uploaded to IPFS. CID: ${ipfsHash}`);

        const metadata = {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type,
        };

        onSuccess(ipfsHash, metadata);
    } catch (error) {
        setError('Error uploading image. Please try again.');
        console.error('Error uploading image:', error);
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUpload;