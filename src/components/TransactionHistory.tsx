import React from "react";
import { useWallet } from "../context/WalletContext.tsx";

const TransactionHistory: React.FC = () => {
  const { transactions } = useWallet();

  return (
    <div className="py-4 shadow rounded">
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id} className="mb-4 border-b pb-2">
              <p>
                <strong>Amount WETH:</strong> {tx.amountWETH}
              </p>
              <p>
                <strong>Amount ERC20:</strong> {tx.amountERC20}
              </p>
              <p>
                <strong>Recipient:</strong> {tx.recipient.slice(0, 6)}...
                {tx.recipient.slice(-4)}
              </p>
              <p>
                <strong>Status:</strong> {tx.status}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(tx.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
