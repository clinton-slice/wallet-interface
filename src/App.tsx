import React, { useState } from "react";
import { ethers } from "ethers";
import Wallet from "./components/Wallet.tsx";
import TokenWrapper from "./components/TokenWrapper.tsx";
import Swap from "./components/Swap.tsx";
import TransactionHistory from "./components/TransactionHistory.tsx";
import { WalletProvider } from "./context/WalletContext.tsx";

const App: React.FC = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200">
        <div className="flex-grow">
          <header className="py-6 px-4 shadow-md bg-gray-900 text-center">
            <h1 className="text-3xl font-bold text-blue-400">
              Web3 Wallet Interface
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Seamlessly interact with Ethereum, wrap ETH, and swap tokens
            </p>
          </header>

          <main className="max-w-4xl mx-auto p-4 space-y-8">
            <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Wallet Connection</h2>
              <Wallet />
            </section>

            {/* Token Wrapper Section */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Wrap ETH to WETH</h2>
              <p className="text-sm text-gray-400 mb-4">
                Convert your ETH to WETH for token swaps. Enter the amount of
                ETH to wrap.
              </p>
              <TokenWrapper />
            </section>

            {/* Swap Section */}

            <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Swap WETH for ERC20
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Choose an ERC20 token and specify the amount of WETH to swap.
              </p>
              <Swap />
            </section>

            {/* Transaction History Section */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Transaction History
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                View your recent transactions, including swaps and conversions.
              </p>
              <TransactionHistory />
            </section>
          </main>
        </div>
        {/* Footer */}
        <footer className="py-4 bg-gray-900 text-center">
          <p className="text-gray-500 text-sm">Built with ❤️ by Clinton</p>
        </footer>
      </div>
    </WalletProvider>
  );
};

export default App;
