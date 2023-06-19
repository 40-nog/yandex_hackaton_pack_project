/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./NoGoodspage.css";
import Footer from "../Footer/Footer";
import CardList from "../Card/CardList";
import UniButton from "../UniButton/UniButton";
import ForemanTooltip from "../Problempage/ForemanTooltip/ForemanTooltip";

function NoGoodspage({ cards, cardBarcode, checkedCards, sendStatusAboutNoGoods }) {
  const [IsKeyboardButtonActive, setIsKeyboardButtonActive] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isForemanTooltipOpen, setIsForemanTooltipOpen] = useState(false);

  const handleCallBrigButton = () => {
    setIsForemanTooltipOpen(true);
    sendStatusAboutNoGoods();
  };

  return (
    <>
      <div className="nogoods__container">
        <div className="main__left-column" />
        <div className="main__center-column">
          <h2 className="nogoods__title">Какого товара нет?</h2>
          <CardList
            cards={cards}
            cardBarcode={cardBarcode}
            checkedCards={checkedCards}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
          />
        </div>
        {selectedCards.length === 0 && <div className="main__right-column" />}
        {selectedCards.length > 0 && (
          <div className="main__right-column">
            <UniButton
              currentPage="nogoodspage"
              name="Далее"
              changeCards={handleCallBrigButton}
            />
          </div>
        )}
      </div>
      <Footer IsKeyboardButtonActive={IsKeyboardButtonActive} />
      <ForemanTooltip isOpen={isForemanTooltipOpen} />
    </>
  );
}

export default NoGoodspage;
