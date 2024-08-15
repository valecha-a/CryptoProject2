// // Part A working code:
// // src/components/ContractInteraction.tsx

// import React, { useState } from 'react';
// import { Button, Typography } from '@mui/material';
// import Web3 from 'web3';
// import NFTMarketplaceABI from '../utils/NFTMarketplace.json';

// interface ContractInteractionProps {
//   contractAddress: string;
//   account: string;
// }

// //const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8547');
// const web3 = new Web3(window.ethereum);

// const ContractInteraction: React.FC<ContractInteractionProps> = ({ contractAddress, account }) => {
//   const [result, setResult] = useState<string | null>(null);

//   const mintNFT = async () => {
//     if (!contractAddress || !account) {
//       console.error('Contract address or account is missing');
//       return;
//     }

//     const provider = new web3.eth.Contract(NFTMarketplaceABI.abi, contractAddress);

//     try {
//       // Fetch the latest token ID from the contract
//       const latestTokenId: string = await provider.methods.latestTokenId().call();
//       console.log(`Fetched Token ID: ${latestTokenId}`);

//       // Fetch the URI for the latest token ID
//       const uri: string = await provider.methods.tokenURI(latestTokenId).call();
//       console.log(`Fetched Token URI: ${uri}`);

//       // Mint the NFT
//       const result = await provider.methods.mintNFT(uri).send({ from: account });
//       if (result.events && result.events.Transfer) {
//         const mintedTokenId = result.events.Transfer.returnValues.tokenId;
//         setResult(`Minted NFT with Token ID: ${mintedTokenId}`);
//       } else {
//         setResult('Minted NFT, but no token ID was returned.');
//       }
//     } catch (error: any) {
//       setResult(`Error minting NFT: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h6">Mint Contract</Typography>
//       <Button variant="contained" onClick={mintNFT}>Mint NFT</Button>
//       {result && <Typography>{result}</Typography>}
//     </div>
//   );
// };

// export default ContractInteraction;



// import React, { useState, useEffect } from 'react';
// import { Button, Typography, TextField } from '@mui/material';
// import Web3 from 'web3';
// import NFTCollectionABI from '../utils/NFTCollectionContract.json';
// import ERC20ABI from '../utils/ERC20Token/ERC20Token.json';

// interface ContractInteractionProps {
//   contractAddress: string;
//   account: string;
//   tokenAddress: string;
// }

// const web3 = new Web3(window.ethereum);

// const ContractInteraction: React.FC<ContractInteractionProps> = ({ contractAddress, account, tokenAddress }) => {
//   const [result, setResult] = useState<string | null>(null);
//   const [tokenAmount, setTokenAmount] = useState<string>('');
//   const [isBuying, setIsBuying] = useState<boolean>(false);

//   useEffect(() => {
//     if (!contractAddress || !account) {
//       console.error('Contract address or account is missing');
//     }
//   }, [contractAddress, account]);

//   const mintNFT = async () => {
//     if (!contractAddress || !account) {
//       console.error('Contract address or account is missing');
//       return;
//     }

//     const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, contractAddress);
//     const erc20TokenContract = new web3.eth.Contract(ERC20ABI.abi, tokenAddress);

//     try {
//       const tokenURI = "ipfs://your-token-uri";
//       const price = web3.utils.toWei('1', 'ether'); // Set the price in ERC20 tokens

//       // Approve the ERC20 token transfer
//       await erc20TokenContract.methods.approve(contractAddress, price).send({ from: account });

//       // Mint the NFT with ERC20 payment
//       const tx = await nftCollectionContract.methods.mintNFT(tokenURI, price).send({ from: account });
//       setResult(`Minted NFT with transaction hash: ${tx.transactionHash}`);
//     } catch (error: any) {
//       console.error("Error minting NFT:", error.message);
//       setResult(`Error minting NFT: ${error.message}`);
//     }
//   };

//   const buyNFT = async (tokenId: number) => {
//     if (!contractAddress || !account) {
//       console.error('Contract address or account is missing');
//       return;
//     }

//     const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, contractAddress);
//     const nft = await nftCollectionContract.methods.nfts(tokenId).call() as { price: string };
//     if (!nft || typeof nft.price === 'undefined') {
//       console.error("NFT price not found");
//       return;
//     }
//     const price = nft.price;

//     const erc20TokenContract = new web3.eth.Contract(ERC20ABI.abi, tokenAddress);

//     try {
//       setIsBuying(true);

//       // Approve the ERC20 token transfer
//       await erc20TokenContract.methods.approve(contractAddress, price).send({ from: account });

//       // Buy the NFT
//       const tx = await nftCollectionContract.methods.buyNFT(tokenId).send({ from: account });
//       setResult(`Bought NFT with transaction hash: ${tx.transactionHash}`);
//     } catch (error: any) {
//       console.error("Error buying NFT:", error.message);
//       setResult(`Error buying NFT: ${error.message}`);
//     } finally {
//       setIsBuying(false);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h6">Contract Interaction</Typography>
      
//       <TextField
//         label="Token Amount"
//         value={tokenAmount}
//         onChange={(e) => setTokenAmount(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
      
//       <Button variant="contained" onClick={mintNFT}>
//         Mint NFT
//       </Button>
      
//       {isBuying && <Typography>Processing purchase...</Typography>}
//       {result && <Typography>{result}</Typography>}
//     </div>
//   );
// };

// export default ContractInteraction;


// import React, { useState, useEffect } from 'react';
// import { Button, Typography, TextField } from '@mui/material';
// import Web3 from 'web3';
// import NFTCollectionABI from '../utils/NFTCollectionContract.json';
// import ERC20ABI from '../utils/ERC20Token/ERC20Token.json';

// interface ContractInteractionProps {
//   contractAddress: string;
//   account: string;
//   tokenAddress: string;
// }

// const web3 = new Web3(window.ethereum);

// const ContractInteraction: React.FC<ContractInteractionProps> = ({ contractAddress, account, tokenAddress }) => {
//   const [result, setResult] = useState<string | null>(null);
//   const [tokenAmount, setTokenAmount] = useState<string>('');
//   const [isMinting, setIsMinting] = useState<boolean>(false);
//   const [isBuying, setIsBuying] = useState<boolean>(false);

//   useEffect(() => {
//     if (!contractAddress || !account) {
//       console.error('Contract address or account is missing');
//     }
//   }, [contractAddress, account]);

//   const mintNFT = async () => {
//     if (!contractAddress || !account) {
//       console.error('Contract address or account is missing');
//       return;
//     }

//     const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, contractAddress);
//     const erc20TokenContract = new web3.eth.Contract(ERC20ABI.abi, tokenAddress);

//     try {
//       setIsMinting(true);
//       const tokenURI = "ipfs://your-token-uri";
//       const price = web3.utils.toWei(tokenAmount, 'ether'); // Convert the token amount to wei

//       console.log(`Minting NFT with price: ${price} ERC20 tokens`);

//       // Approve the ERC20 token transfer
//       await erc20TokenContract.methods.approve(contractAddress, price).send({ from: account });
//       console.log('ERC20 token transfer approved');

//       // Mint the NFT with ERC20 payment
//       const tx = await nftCollectionContract.methods.mintNFT(tokenURI, price).send({ from: account });
//       console.log(`Minted NFT with transaction hash: ${tx.transactionHash}`);
//       setResult(`Minted NFT with transaction hash: ${tx.transactionHash}`);
//     } catch (error: any) {
//       console.error("Error minting NFT:", error.message);
//       setResult(`Error minting NFT: ${error.message}`);
//     } finally {
//       setIsMinting(false);
//     }
//   };

//   const buyNFT = async (tokenId: number) => {
//     if (!contractAddress || !account) {
//       console.error('Contract address or account is missing');
//       return;
//     }

//     const nftCollectionContract = new web3.eth.Contract(NFTCollectionABI.abi, contractAddress);
//     const erc20TokenContract = new web3.eth.Contract(ERC20ABI.abi, tokenAddress);

//     try {
//       setIsBuying(true);
//       const nft = await nftCollectionContract.methods.nfts(tokenId).call() as { price: string };
//       if (!nft || typeof nft.price === 'undefined') {
//         console.error("NFT price not found");
//         return;
//       }

//       const price = nft.price;

//       console.log(`Buying NFT with price: ${price} ERC20 tokens`);

//       // Approve the ERC20 token transfer
//       await erc20TokenContract.methods.approve(contractAddress, price).send({ from: account });
//       console.log('ERC20 token transfer approved');

//       // Buy the NFT
//       const tx = await nftCollectionContract.methods.buyNFT(tokenId).send({ from: account });
//       console.log(`Bought NFT with transaction hash: ${tx.transactionHash}`);
//       setResult(`Bought NFT with transaction hash: ${tx.transactionHash}`);
//     } catch (error: any) {
//       console.error("Error buying NFT:", error.message);
//       setResult(`Error buying NFT: ${error.message}`);
//     } finally {
//       setIsBuying(false);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h6">Contract Interaction</Typography>

//       <TextField
//         label="Token Amount"
//         value={tokenAmount}
//         onChange={(e) => setTokenAmount(e.target.value)}
//         fullWidth
//         margin="normal"
//         disabled={isMinting || isBuying}
//       />

//       <Button variant="contained" onClick={mintNFT} disabled={isMinting || !tokenAmount}>
//         {isMinting ? 'Minting...' : 'Mint NFT'}
//       </Button>

//       {isBuying && <Typography>Processing purchase...</Typography>}
//       {result && <Typography>{result}</Typography>}
//     </div>
//   );
// };

// export default ContractInteraction;


// Part B code working

import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Web3 from 'web3';
import NFTMarketplaceABI from '../utils/NFTMarketplace.json';

interface ContractInteractionProps {
  contractAddress: string;
  account: string;
}

//const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8547');
const web3 = new Web3(window.ethereum);

const ContractInteraction: React.FC<ContractInteractionProps> = ({ contractAddress, account }) => {
  const [result, setResult] = useState<string | null>(null);

  const mintNFT = async () => {
    if (!contractAddress || !account) {
      console.error('Contract address or account is missing');
      return;
    }

    const provider = new web3.eth.Contract(NFTMarketplaceABI.abi, contractAddress);

    try {
      // Fetch the latest token ID from the contract
      const latestTokenId: string = await provider.methods.latestTokenId().call();
      console.log(`Fetched Token ID: ${latestTokenId}`);

      // Fetch the URI for the latest token ID
      const uri: string = await provider.methods.tokenURI(latestTokenId).call();
      console.log(`Fetched Token URI: ${uri}`);

      // Mint the NFT
      const result = await provider.methods.mintNFT(uri).send({ from: account });
      if (result.events && result.events.Transfer) {
        const mintedTokenId = result.events.Transfer.returnValues.tokenId;
        setResult(`Minted NFT with Token ID: ${mintedTokenId}`);
      } else {
        setResult('Minted NFT, but no token ID was returned.');
      }
    } catch (error: any) {
      setResult(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div>
      <Typography variant="h6">Mint Contract</Typography>
      <Button variant="contained" onClick={mintNFT}>Mint NFT</Button>
      {result && <Typography>{result}</Typography>}
    </div>
  );
};

export default ContractInteraction;