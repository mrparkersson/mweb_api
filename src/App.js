import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Campaings from "./components/Campaigns";

const campaignsUrl =
  "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public";
function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [freeSetupCodes, setFreeSetUpCodes] = useState([]);
  const [prepaidCodes, setPrepaidCodes] = useState([]);
  const [showFreeSetupCodes, setShowFreeSetupCodes] = useState(false);
  const [showPrepaidCodes, setShowPrepaidCodes] = useState(true);

  useEffect(() => {
    async function fetchCampaignData() {
      try {
        const reponse = await axios.get(campaignsUrl);
        setCampaigns(reponse.data.campaigns);
      } catch (error) {}
    }

    fetchCampaignData();
  }, []);

  const campaignPromocodes = campaigns.map((c) => {
    return {
      name: c.name,
      promocodes: c.promocodes,
    };
  });

  const freeSetupRouterData = "FREE setup + router";
  const prepaidFibre = "Prepaid Fibre";

  const getFreeSetupRouterData = campaignPromocodes.filter(
    (p) => p.name === freeSetupRouterData
  );

  const getPrepaidFibreData = campaignPromocodes.filter(
    (p) => p.name === prepaidFibre
  );

  const getFreeSetupCodes = () => {
    const codes = getFreeSetupRouterData.map((c) => c.promocodes);
    setFreeSetUpCodes(codes);
    setShowFreeSetupCodes((code) => !code);
    setShowPrepaidCodes((code) => code);
  };

  const getPrepaidCodes = () => {
    const codes = getPrepaidFibreData.map((c) => c.promocodes);
    setPrepaidCodes(codes);
    setShowFreeSetupCodes((code) => code);
    setShowPrepaidCodes((code) => !code);
  };

  return (
    <div className="App">
      <Campaings
        getFreeSetupCodes={getFreeSetupCodes}
        getFreeSetupRouterData={getFreeSetupRouterData}
        getPrepaidCodes={getPrepaidCodes}
        getPrepaidFibreData={getPrepaidFibreData}
        showFreeSetupCodes={showFreeSetupCodes}
        freeSetupCodes={freeSetupCodes}
        showPrepaidCodes={showPrepaidCodes}
        prepaidCodes={prepaidCodes}
      />
    </div>
  );
}

export default App;
