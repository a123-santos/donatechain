import React, { useState } from "react";
import { address, abi } from "../../constants.js";
import axios from "axios";
import Web3 from "web3";

const OpenCard = ({
  name,
  requiredFund,
  description,
  collectedFunds,
  onDonationSuccess,
}) => {
  const [donationAmount, setDonationAmount] = useState("");
  let currencyType;

  if (requiredFund.toString().length >= 15) {
    requiredFund = Number(requiredFund) / Number(10n ** 18n);
    collectedFunds = Number(collectedFunds) / Number(10n ** 18n);
    collectedFunds = Math.min(requiredFund, collectedFunds);
    currencyType = "ETH";
  } else if (requiredFund.toString().length >= 6) {
    requiredFund = Number(requiredFund) / Number(10n ** 9n);
    collectedFunds = Number(collectedFunds) / Number(10n ** 9n);
    collectedFunds = Math.min(requiredFund, collectedFunds);
    currencyType = "GWEI";
  } else {
    currencyType = "WEI";
  }

 const donate = async () => {
   if (!donationAmount) {
     alert("Please enter a donation amount.");
     return;
   }

   try {
     const web3 = new Web3(window.ethereum);
     await window.ethereum.request({ method: "eth_requestAccounts" });

     const accounts = await web3.eth.getAccounts();
     const account = accounts[0];

     const contract = new web3.eth.Contract(abi, address);

     const txData = contract.methods.addFund(name).encodeABI();

     const gasPrice = await web3.eth.getGasPrice();
     const tx = {
       from: account,
       to: address,
       value: web3.utils.toWei(donationAmount, "ether"),
       data: txData,
       gas: 2000000,
       gasPrice: gasPrice,
     };

     const receipt = await web3.eth.sendTransaction(tx);

     const response = await axios.post(
       "http://localhost:5000/blockchain/addFund", // API-Gateway-Route
       {
         transactionHash: receipt.transactionHash,
         eventName: name,
         amount: donationAmount,
       }
     );

     if (response.status === 200) {
       alert(`You donated ${donationAmount} ETH.`);
       onDonationSuccess();
     } else {
       alert("Failed to add fund. Please try again.");
     }
   } catch (error) {
     console.error("Error adding fund:", error);
     alert("Failed to add fund. Please try again.");
   }

   setDonationAmount("");
 };


  return (
    <div
      className="card text-center mb-3"
      style={{ width: "calc(33.33% - 5px)", margin: "2px" }}
    >
      <div
        className="card-body"
        style={{
          backgroundColor: "#F8F8FF",
          border: "1px solid #9370DB",
          borderRadius: "5px",
        }}
      >
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          {collectedFunds.toString()} / {requiredFund.toString()} {currencyType}
        </p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter amount in ETH"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </div>
        <button
          className="btn"
          type="button"
          style={{ backgroundColor: "#9370DB", color: "white" }}
          onClick={donate}
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default OpenCard;
