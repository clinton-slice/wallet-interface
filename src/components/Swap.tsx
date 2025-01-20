import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext.tsx";

const Swap: React.FC = () => {
  const { provider, walletAddress, addTransaction } = useWallet();
  const [amountWETH, setAmountWETH] = useState<string>("0");
  const [tokenAddress, setTokenAddress] = useState<string>("");

  if (!provider) {
    return (
      <div>
        <p className="text-red-400">
          Please connect your wallet to perform a swap.
        </p>
      </div>
    );
  }

  const performSwap = async () => {
    if (!provider || !walletAddress) return;

    try {
      const signer = provider.getSigner();
      const tx = {
        id: Date.now().toString(),
        amountWETH,
        amountERC20: "15",
        recipient: walletAddress,
        status: "success",
        timestamp: new Date().toISOString(),
      };

      addTransaction(tx);
      alert("Swap successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Amount in WETH"
        value={amountWETH}
        onChange={(e) => setAmountWETH(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="ERC20 Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        className="border px-2 py-1 rounded ml-2"
      />
      <button
        onClick={performSwap}
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Swap
      </button>
    </div>
  );
};

export default Swap;
