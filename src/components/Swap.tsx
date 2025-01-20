import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext.tsx";

const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630b4cf539739df2c5dacab63a7d89669";
const ROUTER_ABI = [
  "function swapExactTokensForTokens(uint256, uint256, address[], address, uint256)",
];

const Swap: React.FC = () => {
  const { provider, walletAddress } = useWallet();
  const [amountWETH, setAmountWETH] = useState<string>("0");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!provider) {
    return (
      <div>
        <p className="text-red-400">
          Please connect your wallet to swap tokens.
        </p>
      </div>
    );
  }

  const performSwap = async () => {
    if (!provider || !walletAddress) {
      setError("Wallet not connected.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const signer = provider.getSigner();
      const router = new ethers.Contract(
        UNISWAP_ROUTER_ADDRESS,
        ROUTER_ABI,
        signer
      );

      const path = [
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
        tokenAddress,
      ];

      const tx = await router.swapExactTokensForTokens(
        ethers.utils.parseEther(amountWETH),
        0, // Minimum amount out (set to 0 for simplicity; in real-world, calculate slippage)
        path,
        walletAddress,
        Math.floor(Date.now() / 1000) + 60 * 20 // 20-minute deadline
      );

      await tx.wait();
      setSuccess(`Successfully swapped ${amountWETH} WETH for ERC20 tokens.`);
    } catch (err: any) {
      setError(err.message || "Swap failed.");
    } finally {
      setLoading(false);
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
        disabled={loading}
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        {loading ? "Swapping..." : "Swap"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Swap;
