//my-nft-marketplace/my-nft-client/src/components/ImageDisplay.tsx

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import NFTMarketplaceABI from '../utils/NFTMarketplace.json';

const CONTRACT_ADDRESS = '0x7384A5022298f36141eba62E36d81b4532113028'; // Your contract address

const ImageDisplay = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (contract) {
        try {
          const totalSupply = await contract.totalSupply();
          const nftsArray = [];

          for (let i = 1; i <= totalSupply; i++) {
            const nft = await contract.nfts(i);
            nftsArray.push(nft);
          }

          setNfts(nftsArray);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      }
    };

    fetchNFTs();
  }, [contract]);

  const connectProvider = async () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await tempProvider.getSigner();
        const tempContract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplaceABI.abi, signer);
        setProvider(tempProvider);
        setContract(tempContract);
      } catch (error) {
        console.error("Error connecting provider:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <button onClick={connectProvider}>Connect Wallet</button>
      <div>
        {nfts.map((nft, index) => (
          <div key={index}>
            <img src={nft.uri} alt={`NFT ${nft.id}`} />
            <p>Price: {ethers.formatUnits(nft.price.toString(), 'ether')} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
