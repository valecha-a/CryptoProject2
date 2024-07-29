
// pragma solidity ^0.8.0;

// import "my-nft-marketplace/contracts/lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "my-nft-marketplace/contracts/lib/openzeppelin-contracts/contracts/utils/Counters.sol";

// contract NFTMarketplace is ERC721URIStorage {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;
//     address public owner;

//     struct NFT {
//         uint256 id;
//         address creator;
//         address owner;
//         string uri;
//         uint256 price;
//         bool isForSale;
//     }

//     mapping(uint256 => NFT) public nfts;

//     constructor() ERC721("NFTMarketplace", "NFTM") {
//         owner = msg.sender;
//     }

//     function createNFT(string memory tokenURI, uint256 price) public returns (uint256) {
//         _tokenIds.increment();
//         uint256 newItemId = _tokenIds.current();

//         _mint(msg.sender, newItemId);
//         _setTokenURI(newItemId, tokenURI);

//         nfts[newItemId] = NFT(newItemId, msg.sender, msg.sender, tokenURI, price, true);

//         return newItemId;
//     }

//     function buyNFT(uint256 tokenId) public payable {
//         NFT memory nft = nfts[tokenId];
//         require(msg.value >= nft.price, "Insufficient payment");
//         require(nft.isForSale, "NFT not for sale");

//         address seller = nft.owner;
//         nft.owner = msg.sender;
//         nft.isForSale = false;
//         nfts[tokenId] = nft;

//         _transfer(seller, msg.sender, tokenId);
//         payable(seller).transfer(msg.value);
//     }

//     function listNFT(uint256 tokenId, uint256 price) public {
//         NFT storage nft = nfts[tokenId];
//         require(nft.owner == msg.sender, "Only owner can list NFT");
//         nft.isForSale = true;
//         nft.price = price;
//     }
// }


// pragma solidity ^0.8.0;

// import "my-nft-marketplace/contracts/lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "my-nft-marketplace/contracts/lib/openzeppelin-contracts/contracts/utils/Counters.sol";
// import "my-nft-marketplace/contracts/lib/openzeppelin-contracts/contracts/access/Ownable.sol";

// contract NFTMarketplace {
//     using Counters for Counters.Counter;
//     Counters.Counter private _collectionIds;
//     address public owner;

//     struct Collection {
//         uint256 id;
//         string name;
//         address owner;
//         address contractAddress;
//     }

//     mapping(uint256 => Collection) public collections;

//     event CollectionCreated(uint256 indexed collectionId, string name, address indexed owner, address contractAddress);

//     constructor() {
//         owner = msg.sender;
//     }

//     function createCollection(string memory name, string memory symbol) public {
//         _collectionIds.increment();
//         uint256 newCollectionId = _collectionIds.current();

//         NFTCollectionContract newCollection = new NFTCollectionContract(name, symbol, msg.sender);
//         collections[newCollectionId] = Collection(newCollectionId, name, msg.sender, address(newCollection));

//         emit CollectionCreated(newCollectionId, name, msg.sender, address(newCollection));
//     }

//     function getAllCollections() public view returns (Collection[] memory) {
//         uint totalCollectionCount = _collectionIds.current();
//         Collection[] memory collectionList = new Collection[](totalCollectionCount);
//         for (uint i = 0; i < totalCollectionCount; i++) {
//             Collection storage collection = collections[i + 1];
//             collectionList[i] = collection;
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

//     constructor(string memory name, string memory symbol, address collectionOwner) ERC721(name, symbol) Ownable(collectionOwner) {
//         // Now the constructor correctly passes the initial owner to the Ownable contract
//     }

//     function createNFT(string memory tokenURI, uint256 price) public onlyOwner returns (uint256) {
//         _tokenIds.increment();
//         uint256 newItemId = _tokenIds.current();

//         _mint(msg.sender, newItemId);
//         _setTokenURI(newItemId, tokenURI);

//         nfts[newItemId] = NFT(newItemId, msg.sender, msg.sender, tokenURI, price, true);

//         return newItemId;
//     }

//     function buyNFT(uint256 tokenId) public payable {
//         NFT memory nft = nfts[tokenId];
//         require(msg.value >= nft.price, "Insufficient payment");
//         require(nft.isForSale, "NFT not for sale");

//         address seller = nft.owner;
//         nft.owner = msg.sender;
//         nft.isForSale = false;
//         nfts[tokenId] = nft;

//         _transfer(seller, msg.sender, tokenId);
//         payable(seller).transfer(msg.value);
//     }

//     function listNFT(uint256 tokenId, uint256 price) public {
//         NFT storage nft = nfts[tokenId];
//         require(nft.owner == msg.sender, "Only owner can list NFT");
//         nft.isForSale = true;
//         nft.price = price;
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
// }


// SPDX-License-Identifier: MIT
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
        address owner;
        address contractAddress;
    }

    mapping(uint256 => Collection) public collections;

    event CollectionCreated(uint256 indexed collectionId, string name, address indexed owner, address contractAddress);

    constructor() {
        owner = msg.sender;
    }

    function createCollection(string memory name, string memory symbol) public {
        _collectionIds.increment();
        uint256 newCollectionId = _collectionIds.current();

        NFTCollectionContract newCollection = new NFTCollectionContract(name, symbol, msg.sender);
        collections[newCollectionId] = Collection(newCollectionId, name, msg.sender, address(newCollection));

        emit CollectionCreated(newCollectionId, name, msg.sender, address(newCollection));
    }

    function getAllCollections() public view returns (Collection[] memory) {
        uint totalCollectionCount = _collectionIds.current();
        Collection[] memory collectionList = new Collection[](totalCollectionCount);
        for (uint i = 0; i < totalCollectionCount; i++) {
            Collection storage collection = collections[i + 1];
            collectionList[i] = collection;
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
        Ownable(collectionOwner)
    {}

    function createNFT(string memory tokenURI, uint256 price) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        nfts[newItemId] = NFT(newItemId, msg.sender, msg.sender, tokenURI, price, true);

        return newItemId;
    }

    function buyNFT(uint256 tokenId) public payable {
        NFT memory nft = nfts[tokenId];
        require(msg.value >= nft.price, "Insufficient payment");
        require(nft.isForSale, "NFT not for sale");

        address seller = nft.owner;
        nft.owner = msg.sender;
        nft.isForSale = false;
        nfts[tokenId] = nft;

        _transfer(seller, msg.sender, tokenId);
        payable(seller).transfer(msg.value);
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        NFT storage nft = nfts[tokenId];
        require(nft.owner == msg.sender, "Only owner can list NFT");
        nft.isForSale = true;
        nft.price = price;
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
}
