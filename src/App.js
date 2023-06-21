import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Campaings from "./components/Campaigns";
import PriceRange from "./components/PriceRange";

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

  const [providers, setProviders] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "https://apigw.mweb.co.za/prod/baas/proxy/marketing/products/promos/FTTH-LINKLAYER-CLAWBACK-100MBUP,FTTH-VUMA-12MONTH-CLAWBACK-25MBPS,FTTH-LIGHTSTRUCK-SETUP-CLAWBACK-100MBUP,FTTH-OCTOTEL-SETUP-CLAWBACK-1MONTHFREE,FTTH-CCC-SETUP-100MBUP,FTTH-FROG-SETUP-CLAWBACK-1MONTHFREE,FTTH-OPEN-SETUP-CLAWBACK-1MONTHFREE,FTTH-WEBCONNECT-M2M,FTTH-CCC-CLARA-CLAWBACK,FTTH-TTCONNECT-CLAWBACK-100MBUP,FTTH-VUMA-SETUP-CLAWBACK-1MONTHFREE,FTTH-EVOTEL-CLAWBACK-100MBUP,FTTH-MFN-CLAWBACK-PROMO4,FTTH-LINKAFRICA-SETUP-CLAWBACK-100MBUP,FTTH-ZOOM-SETUP-CLAWBACK-1MONTHFREE,FTTH-MFN-SETUP-CLAWBACK-1MONTHFREE,FTTH-FROGFOOTAIR-CLAWBACK,FTTH-CCC-ALT-SETUP-100MBUP,FTTH-CLEARACCESS-CLAWBACK,FTTH-VODA-CLAWBACK-100MBUP",
          {
            params: {
              sellable_online: true,
            },
          }
        );
        setProviders(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
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

  const products = providers.map((provider) => provider.products);

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
      <PriceRange
        freeSetupCodes={freeSetupCodes}
        prepaidCodes={prepaidCodes}
        products={products}
      />
    </div>
  );
}

export default App;
