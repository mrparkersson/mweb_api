import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./PriceRange.css";

const PriceRange = ({ products }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [showFreeSetupCodes, setShowFreeSetupCodes] = useState(true);
  const [showFreeSetupCodes2, setShowFreeSetupCodes2] = useState(true);
  const [showFreeSetupCodes3, setShowFreeSetupCodes3] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const priceRanges = [
    { min: 0, max: 699, label: "R0 - R699" },
    { min: 700, max: 999, label: "R700 - R999" },
    { min: 1000, max: 9999, label: "R1000+" },
  ];

  const allProducts = products.flatMap((a) => a);
  let logoBaseURL = "https://www.mweb.co.za/media/images/providers";
  const providerInfo = [
    {
      code: "centurycity",
      name: "Century City Connect",
      url: `${logoBaseURL}/provider-century.png`,
    },
    {
      code: "evotel",
      name: "Evotel",
      url: `${logoBaseURL}/provider-evotel.png`,
    },
    {
      code: "octotel",
      name: "Octotel",
      url: `${logoBaseURL}/provider-octotel.png`,
    },
    {
      code: "vumatel",
      name: "Vumatel",
      url: `${logoBaseURL}/provider-vuma.png`,
    },
    {
      code: "openserve",
      name: "Openserve",
      url: `${logoBaseURL}/provider-openserve.png`,
    },
    {
      code: "frogfoot",
      name: "Frogfoot",
      url: `${logoBaseURL}/provider-frogfoot.png`,
    },
    {
      code: "mfn",
      name: "MFN",
      url: `${logoBaseURL}/provider-metrofibre.png`,
    },
    {
      code: "vodacom",
      name: "Vodacom",
      url: `${logoBaseURL}/provider-vodacom.png`,
    },
    {
      code: "linkafrica",
      name: "Link Africa",
      url: `${logoBaseURL}/provider-linkafrica.png`,
    },
    {
      code: "linklayer",
      name: "Link Layer",
      url: `${logoBaseURL}/provider-link-layer.png`,
    },
    {
      code: "lightstruck",
      name: "Lightstruck",
      url: `${logoBaseURL}/provider-lightstruck.png`,
    },
    {
      code: "mitchells",
      name: "Mitchells Fibre",
      url: `${logoBaseURL}/provider-mitchells.png`,
    },
    {
      code: "vumareach",
      name: "Vuma Reach",
      url: `${logoBaseURL}/provider-vuma.png`,
    },
  ];

  const providers = [
    { name: "Evotel" },
    { name: "Web Connect" },
    { name: "Link Africa" },
    { name: "ZoomFibre" },
    { name: "Frogfoot" },
    { name: "Thinkspeed" },
    { name: "Vumatel" },
    { name: "OpenServe" },
    { name: "ClearAccess" },
    { name: "Lightstruck" },
    { name: "Frogfoot Air" },
    { name: "TT Connect" },
    { name: "Link Layer" },
    { name: "MFN" },
    { name: "Octotel" },
    { name: "Vodacom" },
  ];

  const range1 = 699;
  const range2 = 999;
  const range3 = 1000;

  const filteredProductsBetweenRange1 = allProducts.filter(
    (a) => a.productRate > range1
  );

  const filteredProductsBetweenRange2 = allProducts.filter(
    (a) => a.productRate > range1 && a.productRate <= range2
  );

  const filteredProductsBetweenRange3 = allProducts.filter(
    (a) => a.productRate > range2 && a.productRate > range3
  );

  const getSpecificForRane1 = filteredProductsBetweenRange1.slice(0, 8);
  const getSpecificForRane2 = filteredProductsBetweenRange2.slice(0, 8);
  const getSpecificForRange3 = filteredProductsBetweenRange3.slice(0, 8);

  const onRangeOneClick = () => {
    setData1(getSpecificForRane1);
    setShowFreeSetupCodes((code) => !code);
  };

  const onRangeTwoClick = () => {
    setData2(getSpecificForRane2);
    setShowFreeSetupCodes2((code) => !code);
  };
  const onRangeThreeClick = () => {
    setData3(getSpecificForRange3);
    setShowFreeSetupCodes3((code) => !code);
  };

  const handleClick = (providerName) => {
    const filteredData = allProducts.filter(
      (p) =>
        p.subcategory.replace("Uncapped", "").replace("Capped", "").trim() ===
        providerName
    );
    setTimeout(() => {
      setSelectedProvider(filteredData);
    }, 2000);
  };

  return (
    <div>
      {providers.map((provider) => {
        return (
          <button
            key={uuidv4()}
            name={provider.name}
            onClick={(e) => handleClick(e.target.name)}
          >
            {provider.name}
          </button>
        );
      })}
      {selectedProvider !== null
        ? selectedProvider.map((provider) => {
            const matchedProvider = providerInfo.find(
              (info) =>
                info.name ===
                provider.subcategory
                  .replace("Uncapped", "")
                  .replace("Capped", "")
                  .trim()
            );

            return (
              <ul key={uuidv4()}>
                <li>{provider.productCode}</li>
                <li>{provider.productName}</li>
                <li>{provider.productRate}</li>
                <li>{provider.provider}</li>
                {matchedProvider && (
                  <img src={matchedProvider.url} alt={matchedProvider.name} />
                )}
              </ul>
            );
          })
        : ""}
      <nav>
        <div className="labels-container">
          <div>
            <button onClick={onRangeOneClick}>{priceRanges[0].label}</button>
          </div>
          <div>
            <button onClick={onRangeTwoClick}>{priceRanges[1].label}</button>
          </div>
          <div>
            <button onClick={onRangeThreeClick}>{priceRanges[2].label}</button>
          </div>
        </div>
      </nav>
      <div className="range-one-container">
        {showFreeSetupCodes &&
          data1.map((product) => {
            return (
              <ul key={uuidv4()}>
                <li>{product.productCode}</li>
                <li>{product.productName}</li>
                <li>{product.productRate}</li>
                <li>{product.provider}</li>
              </ul>
            );
          })}
      </div>
      <div className="range-one-container">
        {showFreeSetupCodes2 &&
          data2.map((product) => {
            return (
              <ul key={uuidv4()}>
                <li>{product.productCode}</li>
                <li>{product.productName}</li>
                <li>{product.productRate}</li>
                <li>{product.provider}</li>
              </ul>
            );
          })}
      </div>
      <div className="range-one-container">
        {showFreeSetupCodes3 &&
          data3.map((product) => {
            return (
              <ul key={uuidv4()}>
                <li>{product.productCode}</li>
                <li>{product.productName}</li>
                <li>{product.productRate}</li>
                <li>{product.provider}</li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default PriceRange;
