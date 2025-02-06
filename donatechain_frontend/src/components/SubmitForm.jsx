import React, { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { address, abi } from "../../constants.js";
//import EthCharity from "C:/Users/aksan/VisualStudioCode/DonateChain/artifacts/contracts/EthCharity.sol/EthCharity.json";

const SubmitForm = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [requiredFund, setRequiredFund] = useState("");
  const [currencyType, setCurrencyType] = useState("WEI");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!requiredFund || !description || !eventName) {
      alert("All fields required");
      return;
    }

    let convertedFund = requiredFund;
    if (currencyType === "GWEI") {
      convertedFund = BigInt(requiredFund * 1e9).toString();
    } else if (currencyType === "ETH") {
      convertedFund = BigInt(requiredFund * 1e18).toString();
    }

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const contract = new web3.eth.Contract(abi, address);

      const gasPrice = await web3.eth.getGasPrice();

      const tx = {
        from: account,
        to: address,
        data: contract.methods
          .postEvents(eventName, convertedFund, description)
          .encodeABI(),
        gas: 2000000,
        gasPrice: gasPrice,
      };

      const receipt = await web3.eth.sendTransaction(tx);

      const response = await axios.post(
        "http://localhost:5000/blockchain/events",
        {
          transactionHash: receipt.transactionHash,
        }
      );

      if (response.status === 200) {
        alert("Event submitted successfully!");
        navigate("/home");
      } else {
        alert("Failed to submit event. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Failed to submit event. Please try again.");
    }
  };

  return (
    <div style={{ height: "95vh" }}>
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <div
          style={{
            border: "5px solid #9370DB",
            borderRadius: "15px",
            padding: "30px",
            backgroundColor: "#F8F8FF",
            width: "70%",
            margin: "auto",
          }}
        >
          <h2>Submit Funding Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="eventName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                required
                style={{ width: "60%", margin: "0 auto" }}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fundraiserName" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="fundraiserName"
                required
                style={{ width: "60%", margin: "0 auto" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-row" style={{ display: "flex", flex: 1 }}>
              <div className="mb-3" style={{ marginRight: "10px" }}>
                <label htmlFor="requiredFund" className="form-label">
                  Required Fund
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="requiredFund"
                  required
                  style={{ width: "60%", margin: "0 auto" }}
                  placeholder="Enter Amount"
                  value={requiredFund}
                  onChange={(e) => setRequiredFund(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Select Currencytype</label>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currencyType}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setCurrencyType("ETH")}
                      >
                        ETH
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setCurrencyType("GWEI")}
                      >
                        GWEI
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setCurrencyType("WEI")}
                      >
                        WEI
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-lg"
              style={{
                backgroundColor: "#9370DB",
                color: "white",
                padding: "10px 20px",
                width: "30%",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
