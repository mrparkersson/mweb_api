import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const PriceRange = ({ products }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [showFreeSetupCodes, setShowFreeSetupCodes] = useState(true);
  const [showFreeSetupCodes2, setShowFreeSetupCodes2] = useState(true);
  const [showFreeSetupCodes3, setShowFreeSetupCodes3] = useState(true);
  const priceRanges = [
    { min: 0, max: 699, label: "R0 - R699" },
    { min: 700, max: 999, label: "R700 - R999" },
    { min: 1000, max: 9999, label: "R1000+" },
  ];

  const range1 = 699;
  const range2 = 999;
  const range3 = 1000;

  const allProducts = products.flatMap((a) => a);

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

  return (
    <div>
      <nav>
        <ul className="labels-container">
          <div>
            <FontAwesomeIcon icon={faCheckSquare} onClick={onRangeOneClick} />
            <li onClick={onRangeOneClick}>{priceRanges[0].label}</li>
          </div>
          <div>
            {" "}
            <FontAwesomeIcon icon={faCheckSquare} onClick={onRangeTwoClick} />
            <li onClick={onRangeTwoClick}>{priceRanges[1].label}</li>
          </div>
          <div>
            {" "}
            <FontAwesomeIcon icon={faCheckSquare} onClick={onRangeThreeClick} />
            <li onClick={onRangeThreeClick}>{priceRanges[2].label}</li>
          </div>
        </ul>
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
