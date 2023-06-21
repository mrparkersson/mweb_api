import React from "react";
import "./Campaigns.css";
const Campaings = ({
  getFreeSetupCodes,
  getFreeSetupRouterData,
  getPrepaidCodes,
  getPrepaidFibreData,
  showFreeSetupCodes,
  freeSetupCodes,
  showPrepaidCodes,
  prepaidCodes,
}) => {
  return (
    <div className="campaign-container">
      <nav className="campaign-providers">
        <div className="free-campain-container">
          <button onClick={getFreeSetupCodes}>
            {getFreeSetupRouterData.map((name) => name.name)}
          </button>
        </div>
        <div className="prepaid-container">
          <button onClick={getPrepaidCodes}>
            {getPrepaidFibreData.map((name) => name.name)}
          </button>
        </div>
      </nav>
      <div className="promocodes-related-campaign">
        {showFreeSetupCodes &&
          freeSetupCodes.map((freeSetupCode) => {
            return (
              <ul key={freeSetupCode}>
                <li>{freeSetupCode}</li>
              </ul>
            );
          })}

        {showPrepaidCodes &&
          prepaidCodes.map((prepaidCode) => {
            return (
              <ul key={prepaidCode}>
                <li>{prepaidCode}</li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default Campaings;
