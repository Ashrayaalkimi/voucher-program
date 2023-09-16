// declare global {
//     interface Window {
//       ethereum?: any; // Define the ethereum property
//     }
//   }

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}