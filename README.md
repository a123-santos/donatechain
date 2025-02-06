# Donate Chain - Decentralized Donation Platform

## Overview

Donate Chain is a decentralized application (DApp) deployed on the Ethereum Sepolia testnet. It ensures transparency and security for donations through blockchain technology. Users can create projects that need funding, donate using test ETH, and once the required amount is reached, the funds are automatically transferred to the respective organization. The system follows a microservice architecture.

## Technologies Used

- **Blockchain & Smart Contracts:** Solidity, Hardhat, Ethers.js, Remix IDE
- **Frontend:** JavaScript, React, Ethers.js, Metamask integration
- **Backend:** Node.js, Express.js, MongoDB
- **Infrastructure:** Microservice architecture

## Setup Instructions

To run the project locally, open **four terminal windows**, one for each service.

### Deploy Smart Contract
```bash
cd donatechain_backend
npm i
npx hardhat deploy
npx hardhat node
```
**Important:** Take a private key from the printed outputs and import it into MetaMask.

### Start API Gateway
```bash
cd donatechain_api_gateway
npm i
npm run dev
```

### Start Authentication Service
```bash
cd donatechain_auth
npm i
npm run dev
```

### Start Frontend
```bash
cd donatechain_frontend
npm i
npm run dev
```

## Notes

- Ensure that MongoDB is active, and your IP is whitelisted if using a remote cluster.
- The project was built for demonstration purposes using the Ethereum Sepolia testnet.
