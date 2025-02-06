import React, { useEffect, useState } from "react";
import axios from "axios";
import RaisedCampaignCard from "./RaisedCampaignCard.jsx";
import MyDonationCard from "./MyDonationCard.jsx";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [donatedEvents, setDonatedEvents] = useState([]);

  useEffect(() => {
    const listedEvents = async () => {
      try {
        // Fetch all events
        const response = await axios.get(
          "http://localhost:5000/blockchain/events"
        );
        const fetchedEvents = response.data;

        console.log("Fetched Events:", fetchedEvents); // Debug log

        // Fetch events the user has donated to
        const donatedEventNamesResponse = await axios.get(
          `http://localhost:5000/blockchain/donors/${localStorage.getItem(
            "walletAddress"
          )}`
        );
        const donatedEventNames = donatedEventNamesResponse.data;

        console.log("Donated Event Names:", donatedEventNames); // Debug log

        // Update fetched events with donation amounts
        const updatedFetchedEvents = donatedEventNames
          .map((event) => {
            const matchingFetchedEvent = fetchedEvents.find(
              (fetchedEvent) => event[0] === fetchedEvent[0]
            );
            if (matchingFetchedEvent) {
              const newFetchedEvent = [...matchingFetchedEvent];
              newFetchedEvent[4] = event[1]; // Assuming event[4] is collectedFunds
              return newFetchedEvent;
            }
            return null;
          })
          .filter((event) => event !== null);

        console.log("Updated Fetched Events:", updatedFetchedEvents); // Debug log

        setDonatedEvents(updatedFetchedEvents);

        // Filter events created by the user
        const walletAddress = localStorage
          .getItem("walletAddress")
          .toLowerCase();
        const ownEvents = fetchedEvents.filter(
          (event) => event[2].toLowerCase() === walletAddress
        );

        console.log("Own Events:", ownEvents); // Debug log

        setEvents(ownEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (localStorage.getItem("walletConnected") === "True") {
      listedEvents();
    }
  }, []);

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
          <h2>My Donations</h2>
          <ul
            className="list-group flex flex-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {donatedEvents.map((event, index) => (
              <MyDonationCard
                key={index}
                name={event[0]}
                description={event[5]}
                requiredFund={parseFloat(event[1])}
                collectedFunds={parseFloat(event[4])}
              />
            ))}
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
          <h2>Created Campaigns</h2>
          <ul
            className="list-group flex flex-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {events.map((event, index) => (
              <RaisedCampaignCard
                key={index}
                name={event[0]}
                description={event[5]}
                requiredFund={parseFloat(event[1])}
                collectedFunds={parseFloat(event[4])}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
