import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext.tsx";

const Wallet = () => {
  const {
    walletAddress,
    ethBalance,
    wethBalance,
    isLoading,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  return (
    <>
      {walletAddress ? (
        <div>
          <p className="text-lg">
            <span className="font-medium text-gray-400">Connected Wallet:</span>{" "}
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          <p className="mt-2 text-lg">
            <span className="font-medium text-gray-400">ETH Balance:</span>{" "}
            {ethBalance} ETH
          </p>
          <p className="mt-2 text-lg">
            <span className="font-medium text-gray-400">WETH Balance:</span>{" "}
            {wethBalance} WETH
          </p>
          <button
            onClick={disconnectWallet}
            className="mt-4 w-full md:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={connectWallet}
            className="w-full md:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
          >
            Connect Wallet
          </button>
          {isLoading && (
            <div className="mt-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-2 text-sm text-gray-400">Connecting...</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Wallet;
