// Part A working code:
// my-nft-marketplace/my-nft-client/src/global.d.ts

declare global {
    interface Window {
      ethereum: any;
    }
  }
  
  export {};