npm i

Deploy Hardhat Node:
npx hardhat deploy
npx hardhat node -> default local hardhat

Deploy on Sepolia Testnet:
edit line 9 in hardhat.config.js -> change 'hardhat' to 'sepolia'
uncomment line 2 in constants.js 
comment out line 1 in constants.js 
uncomment line 2 in constants.js in frontend folder
comment out line 1 in constants.js in frontend folder
npx hardhat deploy

Start Blockchain-service:
In seperate terminal -> npm run dev