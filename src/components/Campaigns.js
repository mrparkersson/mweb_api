import React from "react";
import "./Campaigns.css";
import { motion } from "framer-motion";

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
                <motion.li
                  initial={{ scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 50,
                  }}
                  className="free-setup-code"
                >
                  {freeSetupCode}
                </motion.li>
              </ul>
            );
          })}

        {showPrepaidCodes &&
          prepaidCodes.map((prepaidCode) => {
            return (
              <ul key={prepaidCode}>
                <motion.li
                  initial={{ scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 50,
                  }}
                  className="free-setup-code"
                >
                  {prepaidCode}
                </motion.li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default Campaings;
