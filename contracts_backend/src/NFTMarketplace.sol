// Part A working code:
// my-nft-marketplace/contracts_backend/src/NFTMarketplace.sol

// pragma solidity ^0.8.0;

// import "my-nft-marketplace/contracts_backend/lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "my-nft-marketplace/contracts_backend/lib/openzeppelin-contracts/contracts/utils/Counters.sol";
// import "my-nft-marketplace/contracts_backend/lib/openzeppelin-contracts/contracts/access/Ownable.sol";

// contract NFTMarketplace {
//     using Counters for Counters.Counter;
//     Counters.Counter private _collectionIds;
//     address public owner;

//     struct Collection {
//         uint256 id;
//         string name;
//         string symbol;
//         string imageHash; // Added to store the CID for the collection's image
//         address owner;
//         address contractAddress;
//     }

//     mapping(uint256 => Collection) public collections;

//     event CollectionCreated(uint256 indexed collectionId, string name, address indexed owner, address contractAddress);

//     constructor() {
//         owner = msg.sender;
//     }

//     function createCollection(string memory name, string memory symbol, string memory imageHash) public {
//         _collectionIds.increment();
//         uint256 newCollectionId = _collectionIds.current();

//         // Deploy the new NFT collection contract
//         NFTCollectionContract newCollection = new NFTCollectionContract(name, symbol, msg.sender);
//         collections[newCollectionId] = Collection(newCollectionId, name, symbol, imageHash, msg.sender, address(newCollection));

//         emit CollectionCreated(newCollectionId, name, msg.sender, address(newCollection));
//     }

//     function getAllCollections() public view returns (Collection[] memory) {
//         uint totalCollectionCount = _collectionIds.current();
//         Collection[] memory collectionList = new Collection[](totalCollectionCount);

//         for (uint i = 1; i <= totalCollectionCount; i++) {
//             Collection storage collection = collections[i];
//             collectionList[i - 1] = collection;
//         }

//         return collectionList;
//     }
// }

// contract NFTCollectionContract is ERC721URIStorage, Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;

//     struct NFT {
//         uint256 id;
//         address creator;
//         address owner;
//         string uri;
//         uint256 price;
//         bool isForSale;
//     }

//     mapping(uint256 => NFT) public nfts;

//     constructor(string memory name, string memory symbol, address collectionOwner)
//         ERC721(name, symbol)
//         Ownable(collectionOwner) // Pass the collectionOwner to Ownable constructor
//     {}

//     function mintNFT(string memory tokenURI, uint256 price) public onlyOwner returns (uint256) {
//         _tokenIds.increment();
//         uint256 newItemId = _tokenIds.current();

//         _mint(msg.sender, newItemId);
//         _setTokenURI(newItemId, tokenURI);

//         nfts[newItemId] = NFT(newItemId, msg.sender, msg.sender, tokenURI, price, true);

//         return newItemId;
//     }

//     function getAllNFTs() public view returns (NFT[] memory) {
//         uint totalItemCount = _tokenIds.current();
//         NFT[] memory items = new NFT[](totalItemCount);
//         for (uint i = 0; i < totalItemCount; i++) {
//             NFT storage currentItem = nfts[i + 1];
//             items[i] = currentItem;
//         }
//         return items;
//     }

//     function getNFTsByOwner(address owner) public view returns (NFT[] memory) {
//         uint totalItemCount = _tokenIds.current();
//         uint count = 0;

//         // Count how many NFTs are owned by the specific address
//         for (uint i = 1; i <= totalItemCount; i++) {
//             if (nfts[i].owner == owner) {
//                 count++;
//             }
//         }

//         NFT[] memory ownedNFTs = new NFT[](count);
//         uint index = 0;

//         // Add NFTs owned by the specific address to the result array
//         for (uint i = 1; i <= totalItemCount; i++) {
//             if (nfts[i].owner == owner) {
//                 ownedNFTs[index] = nfts[i];
//                 index++;
//             }
//         }

//         return ownedNFTs;
//     }
// }


  




//Part B working code
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "my-nft-marketplace/contracts_backend/lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace {
    using Counters for Counters.Counter;
    Counters.Counter private _collectionIds;
    address public owner;

    struct Collection {
        uint256 id;
        string name;
        string symbol;
        string imageHash;
        address owner;
        address contractAddress;
    }

    mapping(uint256 => Collection) public collections;

    event CollectionCreated(
        uint256 indexed collectionId,
        string name,
        address indexed owner,
        address contractAddress
    );

    constructor() {
        owner = msg.sender;
    }

    function createCollection(
        string memory name,
        string memory symbol,
        string memory imageHash,
        address tokenAddress // ERC20 token address for payments
    ) public {
        _collectionIds.increment();
        uint256 newCollectionId = _collectionIds.current();

        // Deploy the new NFT collection contract with ERC20 payment functionality
        NFTCollectionContract newCollection = new NFTCollectionContract(
            name,
            symbol,
            msg.sender,
            tokenAddress
        );
        collections[newCollectionId] = Collection(
            newCollectionId,
            name,
            symbol,
            imageHash,
            msg.sender,
            address(newCollection)
        );

        emit CollectionCreated(newCollectionId, name, msg.sender, address(newCollection));
    }

    function getAllCollections() public view returns (Collection[] memory) {
        uint totalCollectionCount = _collectionIds.current();
        Collection[] memory collectionList = new Collection[](totalCollectionCount);

        for (uint i = 1; i <= totalCollectionCount; i++) {
            Collection storage collection = collections[i];
            collectionList[i - 1] = collection;
        }

        return collectionList;
    }
}

contract NFTCollectionContract is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 public acceptedToken;

    struct NFT {
        uint256 id;
        address creator;
        address owner;
        string uri;
        uint256 price;
        bool isForSale;
    }

    mapping(uint256 => NFT) public nfts;

    constructor(
        string memory name,
        string memory symbol,
        address collectionOwner,
        address tokenAddress
    ) ERC721(name, symbol) Ownable(collectionOwner) {
        acceptedToken = IERC20(tokenAddress);
    }

    function mintNFT(string memory tokenURI, uint256 price) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        // Transfer the ERC20 tokens as payment
        require(
            acceptedToken.transferFrom(msg.sender, owner(), price),
            "Payment failed"
        );

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        nfts[newItemId] = NFT(newItemId, msg.sender, msg.sender, tokenURI, price, true);

        return newItemId;
    }

    function buyNFT(uint256 tokenId) public {
        NFT storage nft = nfts[tokenId];
        require(nft.isForSale, "NFT is not for sale");
        require(nft.owner != msg.sender, "You already own this NFT");

        // Transfer the ERC20 tokens as payment
        require(
            acceptedToken.transferFrom(msg.sender, nft.owner, nft.price),
            "Payment failed"
        );

        // Transfer the NFT to the buyer
        address previousOwner = nft.owner;
        _transfer(previousOwner, msg.sender, tokenId);

        // Update the NFT details
        nft.owner = msg.sender;
        nft.isForSale = false;

        emit Transfer(previousOwner, msg.sender, tokenId);
    }

    function getAllNFTs() public view returns (NFT[] memory) {
        uint totalItemCount = _tokenIds.current();
        NFT[] memory items = new NFT[](totalItemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            NFT storage currentItem = nfts[i + 1];
            items[i] = currentItem;
        }
        return items;
    }

    function getNFTsByOwner(address owner) public view returns (NFT[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint count = 0;

        for (uint i = 1; i <= totalItemCount; i++) {
            if (nfts[i].owner == owner) {
                count++;
            }
        }

        NFT[] memory ownedNFTs = new NFT[](count);
        uint index = 0;

        for (uint i = 1; i <= totalItemCount; i++) {
            if (nfts[i].owner == owner) {
                ownedNFTs[index] = nfts[i];
                index++;
            }
        }

        return ownedNFTs;
    }
}

