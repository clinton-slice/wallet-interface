import React, { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";

interface Transaction {
  id: string;
  amountWETH: string;
  amountERC20: string;
  recipient: string;
  status: string;
  timestamp: string;
}

interface WalletContextProps {
  provider: ethers.providers.Web3Provider | null;
  walletAddress: string | null;
  ethBalance: string;
  wethBalance: string;
  isLoading: boolean;
  transactions: Transaction[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addTransaction: (transaction: Transaction) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string>("0.0");
  const [wethBalance, setWethBalance] = useState<string>("0.0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Disconnected");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found!");
      return;
    }
    try {
      setIsLoading(true);
      setStatus("Connecting...");
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await web3Provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setProvider(web3Provider);
      setWalletAddress(address);

      const balance = await web3Provider.getBalance(address);
      setEthBalance(ethers.utils.formatEther(balance));
      setStatus("Connected");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setWalletAddress(null);
    setEthBalance("0.0");
    setStatus("Disconnected");
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev].slice(0, 3));
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        walletAddress,
        ethBalance,
        transactions,
        isLoading,
        wethBalance,
        connectWallet,
        addTransaction,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
