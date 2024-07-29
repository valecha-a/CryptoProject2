//my-nft-marketplace/my-nft-client/src/ether_utils.ts

import Web3 from 'web3';
import NFTMarketplaceABI from './utils/NFTMarketplace.json';
import NFTCollectionABI from './utils/NFTCollectionContract.json';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_RPC_URL as string));

export const getContract = (contractAddress: string, abi: any) => {
  const contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
};

export const getNFTMarketplaceContract = () => {
  const contractAddress = process.env.REACT_APP_MARKET_PLACE_CONTRACT_ADDRESS as string;
  return getContract(contractAddress, NFTMarketplaceABI.abi);
};

export const getNFTCollectionContract = (collectionAddress: string) => {
  return getContract(collectionAddress, NFTCollectionABI.abi);
};

export const getSigner = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } else {
    throw new Error('Ethereum provider not found');
  }
};
