import { React, useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [connectStatus, setConnectStatus] = useState("Connect Wallet");

  const btnhandler = () => {
    if (connectStatus == "Connect Wallet") {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            setConnectStatus(
              `Connected to ${res[0].slice(0, 6)}...${res[0].slice(-4)}`
            );
            localStorage.setItem("walletAddress", res[0]);
            localStorage.setItem("walletConnected", "True");
          });
        setConnectStatus("Connected");
      } else {
        alert("install metamask extension!!");
      }
    } else {
      setConnectStatus("Connect Wallet");
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("walletConnected");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    let isLoggedIn = localStorage.getItem("walletConnected");
    if (isLoggedIn == "True") {
      let walletAddress = localStorage.getItem("walletAddress");
      setConnectStatus(
        `Connected to ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      );
    }
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ width: "100%", zIndex: "1000" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            DonateChain
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/home">
                  Campaigns
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/create">
                  Create Campaign
                </a>
              </li>
            </ul>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={btnhandler}
              style={{
                flex: 6,
                textAlign: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              {connectStatus}
            </button>
            <GrLogout
              style={{ flex: 1, color: "red" }}
              onClick={handleLogout}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
