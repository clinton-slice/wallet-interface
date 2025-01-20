import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext.tsx";

const WETH_CONTRACT_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const WETH_ABI = [
  "function deposit() public payable",
  "function balanceOf(address) view returns (uint256)",
];

const TokenWrapper: React.FC = () => {
  const { provider, walletAddress } = useWallet();
  const [amount, setAmount] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!provider) {
    return (
      <div>
        <p className="text-red-400">Please connect your wallet to wrap ETH.</p>
      </div>
    );
  }

  const wrapETH = async () => {
    if (!provider || !walletAddress) {
      setError("Wallet not connected.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const signer = provider.getSigner();
      const wethContract = new ethers.Contract(
        WETH_CONTRACT_ADDRESS,
        WETH_ABI,
        signer
      );
      const tx = await wethContract.deposit({
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      setSuccess(`Successfully wrapped ${amount} ETH to WETH.`);
    } catch (err: any) {
      setError(err.message || "Failed to wrap ETH.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={wrapETH}
        disabled={loading}
        className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        {loading ? "Wrapping..." : "Wrap ETH"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default TokenWrapper;
