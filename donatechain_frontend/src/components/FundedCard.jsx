import React from "react";

const FundedCard = ({ name, requiredFund, description }) => {
  
  let currencyType;
  

  if (requiredFund.toString().length >= 15) {
    requiredFund = Number(requiredFund) / Number(10n ** 18n);
    currencyType = "ETH";
  } else if (requiredFund.toString().length >= 6) {
    requiredFund = Number(requiredFund) / Number(10n ** 9n);
    currencyType = "GWEI";
  } else {
    currencyType = "WEI";
  }

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
          {requiredFund.toString()} / {requiredFund.toString()} {currencyType}
        </p>
      </div>
    </div>
  );
};

export default FundedCard;
