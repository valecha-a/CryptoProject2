//my-nft-marketplace/my-nft-client/src/components/ContractInteraction.tsx

import React, { useState } from 'react';
import { ethers, Contract } from 'ethers';
import NFTMarketplaceABI from '../utils/NFTMarketplace.json';

const CONTRACT_ADDRESS = '0x7384A5022298f36141eba62E36d81b4532113028'; // Your contract address

const ContractInteraction = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [tokenURI, setTokenURI] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [tokenId, setTokenId] = useState<number>(0);

  const connectProvider = async () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(tempProvider);

        const signer = await tempProvider.getSigner();
        const tempContract = new Contract(CONTRACT_ADDRESS, NFTMarketplaceABI.abi, signer);
        setContract(tempContract);
      } catch (error) {
        console.error('Error connecting provider:', error);
        alert('Failed to connect to provider.');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const createNFT = async () => {
    if (contract) {
      try {
        const tx = await contract.createNFT(tokenURI, ethers.parseUnits(price.toString(), 'ether'));
        await tx.wait();
        alert('NFT created successfully');
      } catch (error) {
        console.error('Error creating NFT:', error);
      }
    }
  };

  const listNFT = async () => {
    if (contract) {
      try {
        const tx = await contract.listNFT(tokenId, ethers.parseUnits(price.toString(), 'ether'));
        await tx.wait();
        alert('NFT listed for sale successfully');
      } catch (error) {
        console.error('Error listing NFT:', error);
      }
    }
  };

  const buyNFT = async () => {
    if (contract) {
      try {
        const tx = await contract.buyNFT(tokenId, { value: ethers.parseUnits(price.toString(), 'ether') });
        await tx.wait();
        alert('NFT bought successfully');
      } catch (error) {
        console.error('Error buying NFT:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={connectProvider}>Connect Wallet</button>
      <div>
        <input type="text" placeholder="Token URI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
        <input type="number" placeholder="Price (ETH)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <button onClick={createNFT}>Create NFT</button>
      </div>
      <div>
        <input type="number" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))} />
        <input type="number" placeholder="Price (ETH)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <button onClick={listNFT}>List NFT</button>
      </div>
      <div>
        <input type="number" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))} />
        <input type="number" placeholder="Price (ETH)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <button onClick={buyNFT}>Buy NFT</button>
      </div>
    </div>
  );
};

export default ContractInteraction;
