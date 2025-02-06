const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; //hardhat address
//export const address = "0xc05A8Ac4b8110Ecf50d2d6ec961ed200BC520D15"; // sepolia address
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "invalidFund",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "transactionUnsuccessful",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "unAuthorized",
      "type": "error"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_eventName",
          "type": "string"
        }
      ],
      "name": "addFund",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "events",
      "outputs": [
        {
          "internalType": "string",
          "name": "eventName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "requiredFund",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "fundRaiserAddress",
          "type": "address"
        },
        {
          "internalType": "enum EthCharity.EventStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "collectedFund",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "leftAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "eventName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "requiredFund",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "postEvents",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "showDonor",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "eventName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "donatedAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct EthCharity.projectsDonated[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "showEvents",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "eventName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "requiredFund",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "fundRaiserAddress",
              "type": "address"
            },
            {
              "internalType": "enum EthCharity.EventStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "collectedFund",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "internalType": "struct EthCharity.Event[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawFund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

module.exports = { address, abi };