/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */

import "./Card.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import barcodepic from "../../images/barcode.svg";
import Progressbar from "../Progressbar/Progressbar";
import ExpendedCard from "./ExpandedCard/ExpandedCard";

function Card({
  id,
  name,
  barcode,
  picture,
  packageType,
  amount,
  cardBarcode,
  cardBarcodeDefect,
  checkedCards,
  selectedCards,
  setSelectedCards,
  dataForMultiplyBarcodes,
}) {
  const location = useLocation();

  const [expanded, setExpanded] = useState(
    localStorage.getItem(`cardExpanded_${name}`) === "true",
  );
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (location.pathname === "/nogoodspage" && amount === 1) {
      setIsClicked(!isClicked);
      setSelectedCards((prevSelectedCards) => {
        if (prevSelectedCards.includes(barcode)) {
          return prevSelectedCards.filter((card) => card !== barcode);
        }
        return [...prevSelectedCards, barcode];
      });
    }
  };

  const handleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    localStorage.setItem(`cardExpanded_${name}`, newExpanded.toString());
  };

  let boxName = "";
  if (packageType === "Пакет") {
    boxName += "box__name_bag";
  } else if (packageType === "Пузырчатая плёнка") {
    boxName += " box__name_buble";
  } else if (packageType === null) {
    boxName += " box__name_null";
  } else {
    boxName += " box__name_stretch";
  }

  let isBarcodeMatched = false;

  if (location.pathname === "/defectpage") {
    isBarcodeMatched = cardBarcodeDefect.includes(barcode);
  } else {
    isBarcodeMatched = cardBarcode.includes(barcode);
  }

  const [totalMatchedCount, setTotalMatchedCount] = useState(0);

  const updateMatchedCount = () => {
    setTotalMatchedCount((prevCount) => prevCount + 0.5);
  };

  const [flag, setFlag] = useState(0);

  const plusFlag = () => {
    setFlag((prevCount) => prevCount + 1);
  };

  let count = 0;
  if (isBarcodeMatched) {
    count += 1;
  }

  useEffect(() => {
    localStorage.setItem(`cardExpanded_${name}`, expanded.toString());
  }, [expanded, name]);

  return (
    <section className="card">
      <div
        className={`card__container
          ${
            totalMatchedCount > 0 && totalMatchedCount !== amount && amount > 1
              ? "card__container_yellow"
              : ""
          }
          ${
            totalMatchedCount === amount && amount > 1
              ? "card__container_green"
              : ""
          }
          ${isBarcodeMatched ? "card__container_green" : ""}
          ${isClicked ? "card__container_green" : ""}`}
        onClick={handleClick}
      >
        <img
          className="img__card"
          alt=""
          src={`http://localhost:8080/static${picture}`}
        />
        <div className="name__container">
          <p className="name__title">{name}</p>
          {amount === 1 && (
            <div className="barcode__container">
              <img className="barcode__img" alt="" src={barcodepic} />
              <p className="barcode__text">{barcode}</p>
            </div>
          )}
        </div>
        <div className="box__container">
          {packageType !== null ? (
           <p className={`box__name ${boxName}`}>{packageType}</p>
          ) : (
            <p className={`box__name ${boxName}`} />
          )}
          <div className="box__progress-container">
            <p className="box__amount">{amount} шт.</p>
            <Progressbar
              count={totalMatchedCount !== 0 ? totalMatchedCount : count}
              amount={amount}
            />
          </div>
        </div>
        {amount > 1 && (
          <div
            className={`expand__button ${
              expanded ? "expanded__button_open" : ""
            }`}
            role="button"
            onClick={handleExpand}
            tabIndex={0}
          >
            <span
              className={`expand__button_icon ${
                expanded ? "expanded__button_icon_open" : ""
              }`}
            >
              ▼
            </span>
          </div>
        )}
      </div>
      {amount > 1 && expanded && (
        <div className="expanded__cards">
          {dataForMultiplyBarcodes.map((i, index) => (
            <ExpendedCard
              key={index}
              name={name}
              barcode={i}
              picture={null}
              packageType={packageType}
              amount={1}
              cardBarcode={cardBarcode}
              cardBarcodeDefect={cardBarcodeDefect}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
              updateMatchedCount={updateMatchedCount}
              flag={flag}
              plusFlag={plusFlag}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Card;
