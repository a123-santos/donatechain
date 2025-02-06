import React, { useEffect, useState } from "react";
import axios from "axios";
import OpenCard from "./OpenCard.jsx";
import FundedCard from "./FundedCard.jsx";

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const listedEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/blockchain/events"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("walletConnected") === "True") {
      setIsConnected(true);
      listedEvents();
    }
  }, []);

   useEffect(() => {
     const handleAccountsChanged = () => {
       listedEvents();
     };

     if (window.ethereum) {
       window.ethereum.on("accountsChanged", handleAccountsChanged);
     }

     return () => {
       if (window.ethereum) {
         window.ethereum.removeListener(
           "accountsChanged",
           handleAccountsChanged
         );
       }
     };
   }, []);

  const pendingEvents = events.filter((event) => event[3] == 0n);
  const completedEvents = events.filter((event) => event[3] == 1n);

  return (
    <div style={{ height: "95vh" }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            textAlign: "center",
            width: "50%",
            marginRight: "10px",
            marginLeft: "5px",
          }}
        >
          <h2>Open Campaigns</h2>
          <ul
            className="list-group flex flex-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {pendingEvents.map((event, index) => {
              return (
                <OpenCard
                  key={index}
                  name={event[0]}
                  requiredFund={event[1]}
                  collectedFunds={event[4]}
                  description={event[5]}
                  onDonationSuccess={listedEvents}
                />
              );
            })}
          </ul>
        </div>
        <div
          style={{
            textAlign: "center",
            width: "50%",
            marginLeft: "10px",
            marginRight: "5px",
          }}
        >
          <h2>Funded Campaigns</h2>
          <ul
            className="list-group flex flex-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {completedEvents.map((event, index) => (
              <FundedCard
                key={index}
                name={event[0]}
                requiredFund={event[1]}
                description={event[5]}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
