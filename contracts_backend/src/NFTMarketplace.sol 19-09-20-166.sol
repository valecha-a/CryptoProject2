// Part A working code:

// //  // // my-nft-marketplace/contracts_backend/src/NFTMarketplace.sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "my-nft-marketplace/contracts_backend/lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "my-nft-marketplace/contracts_backend/lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "my-nft-marketplace/contracts_backend/lib/openzeppelin-contracts/contracts/access/Ownable.sol";

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

    event CollectionCreated(uint256 indexed collectionId, string name, address indexed owner, address contractAddress);

    constructor() {
        owner = msg.sender;
    }

    function createCollection(string memory name, string memory symbol, string memory imageHash) public {
        _collectionIds.increment();
        uint256 newCollectionId = _collectionIds.current();

        NFTCollectionContract newCollection = new NFTCollectionContract(name, symbol, msg.sender);
        collections[newCollectionId] = Collection(newCollectionId, name, symbol, imageHash, msg.sender, address(newCollection));

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

    struct NFT {
        uint256 id;
        address creator;
        address owner;
        string uri;
        uint256 price;
        bool isForSale;
    }

    mapping(uint256 => NFT) public nfts;

    constructor(string memory name, string memory symbol, address collectionOwner)
        ERC721(name, symbol)
        Ownable(collectionOwner) // Pass the collectionOwner to Ownable constructor
    {}

    function mintNFT(string memory tokenURI, uint256 price) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        nfts[newItemId] = NFT(newItemId, msg.sender, msg.sender, tokenURI, price, true);

        return newItemId;
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





