Here’s a detailed `README.md` file that includes setup instructions, assumptions, and areas for improvement.

---

# **Web3 Wallet Interface**

This project is a Web3 wallet interface that allows users to:

- Connect their wallet using MetaMask.
- Wrap ETH into WETH.
- Swap WETH for an ERC20 token using Uniswap V2.
- View the last three transactions made through Uniswap.

---

## **Table of Contents**

1. [Setup Instructions](#setup-instructions)
2. [Features](#features)
3. [Assumptions](#assumptions)
4. [Areas for Improvement](#areas-for-improvement)
5. [Technologies Used](#technologies-used)

---

## **Setup Instructions**

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/web3-wallet-interface.git
cd web3-wallet-interface
```

### 2. Install dependencies

Ensure you have **Node.js** (v16 or above) and **npm** installed. Then run:

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

This will start the application on `http://localhost:3000`.

### 4. Connect MetaMask

- Ensure you have MetaMask installed in your browser.
- Switch MetaMask to the Ethereum mainnet or a testnet such as Goerli.

---

## **Features**

1. **Wallet Connection**

   - Connect to MetaMask to display the user's wallet address and ETH balance.

2. **Wrap ETH to WETH**

   - Interact with the WETH contract to convert ETH to WETH.

3. **Swap WETH for ERC20 Tokens**

   - Swap WETH for any ERC20 token using the Uniswap V2 Router contract.

4. **Transaction History**
   - Display the last three transactions made through Uniswap, including:
     - Amount of WETH and ERC20 involved.
     - Recipient address (truncated).
     - Status (success, pending, failed).
     - Timestamp.

---

## **Assumptions**

1. **Mock Data for Transaction History**

   - Transaction history is maintained in memory using React Context and does not persist between sessions.

2. **Supported Wallet**

   - The application currently supports only MetaMask for wallet connection.

3. **Gas Fee Calculation**

   - Gas fees are estimated using the `ethers.js` library, and a flat gas limit of `21000` is assumed for most transactions.

4. **Token Details**
   - ERC20 token details, such as decimals and symbols, are not fetched dynamically but can be extended in future iterations.

---

## **Areas for Potential Improvement**

1. **Persistent Transaction History**

   - Store transaction history in a database or a decentralized storage solution (e.g., IPFS).

2. **Enhanced Error Handling**

   - Provide more detailed error messages for failed transactions, such as insufficient balance or incorrect token addresses.

3. **Token Metadata**

   - Fetch token metadata (e.g., symbol, decimals) dynamically using the ERC20 contract ABI.

4. **Multi-Wallet Support**

   - Extend support to wallets other than MetaMask (e.g., WalletConnect, Coinbase Wallet).

5. **Responsive Design**

   - Optimize the interface for mobile and tablet devices for better usability.

6. **Unit and Integration Tests**

   - Add unit tests for components and integration tests for wallet interactions and transactions.

7. **Advanced Gas Fee Calculations**

   - Use dynamic gas estimations for transactions, including swaps and wrapping.

8. **Improved UI/UX**
   - Add tooltips, loading spinners, and visual feedback for better user experience.

---

## **Technologies Used**

- **React**: Frontend library for building the user interface.
- **TypeScript**: Static typing for better code reliability.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **ethers.js**: Library for interacting with the Ethereum blockchain.
- **Uniswap SDK**: For interacting with the Uniswap V2 protocol.
- **MetaMask**: Ethereum wallet used for signing transactions.

---
