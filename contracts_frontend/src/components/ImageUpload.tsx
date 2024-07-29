// my-nft-marketplace/my-nft-client/src/components/ImageUpload.tsx

import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import NFTMarketplaceABI from '../utils/NFTMarketplace.json';

const CONTRACT_ADDRESS = '0x7384A5022298f36141eba62E36d81b4532113028'; // Your contract address

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${btoa(`${process.env.REACT_APP_PINATA_API_KEY}:${process.env.REACT_APP_PINATA_SECRET_KEY}`)}`
  }
});

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [tokenURI, setTokenURI] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadToIPFS = async () => {
    if (image) {
      try {
        const added = await client.add(image);
        const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
        setTokenURI(uri);
        alert('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const createNFT = async () => {
    if (contract && tokenURI) {
      try {
        const tx = await contract.createNFT(tokenURI, ethers.parseUnits(price.toString(), 'ether'));
        await tx.wait();
        alert('NFT created successfully');
      } catch (error) {
        console.error('Error creating NFT:', error);
      }
    }
  };

  const connectProvider = async () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await tempProvider.getSigner();
        const tempContract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplaceABI.abi, signer);
        setProvider(tempProvider);
        setContract(tempContract);
      } catch (error) {
        console.error('Error connecting provider:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <button onClick={connectProvider}>Connect Wallet</button>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadToIPFS}>Upload to IPFS</button>
      <input type="text" placeholder="Token URI" value={tokenURI} readOnly />
      <input type="number" placeholder="Price (ETH)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <button onClick={createNFT}>Create NFT</button>
    </div>
  );
};

export default ImageUpload;
