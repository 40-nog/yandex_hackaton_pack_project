/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./NoGoodspage.css";
import Footer from "../Footer/Footer";
import CardList from "../Card/CardList";
import UniButton from "../UniButton/UniButton";
import ForemanTooltip from "../Problempage/ForemanTooltip/ForemanTooltip";

function NoGoodspage({ cards, cardBarcode, checkedCards }) {
  const [IsKeyboardButtonActive, setIsKeyboardButtonActive] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isForemanTooltipOpen, setIsForemanTooltipOpen] = useState(false);

  const handleCallBrigButton = () => {
    setIsForemanTooltipOpen(true);
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

// /* eslint-disable no-param-reassign */
// /* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./NoGoodspage.css";
// import Footer from "../Footer/Footer";
// import CardList from "../Card/CardList";
// import UniButton from "../UniButton/UniButton";
// import ForemanTooltip from "../Problempage/ForemanTooltip/ForemanTooltip"

// function NoGoodspage({ cards, cardBarcode, checkedCards }) {
//   const [IsKeyboardButtonActive, setIsKeyboardButtonActive] = useState(false);
//   const [selectedCards, setSelectedCards] = useState([]);
//   const [fakeCards, setFakeCards] = useState([]);
//   const [flag, setFlag] = useState(false);
//   const [isForemanTooltipOpen, setIsForemanTooltipOpen] = useState(false);

//   const handleCallBrigButton = () => {
//     setIsForemanTooltipOpen(true);
//   };

//   useEffect(() => {
//     const newFakeCards = [];
//     selectedCards.forEach((selectedCard) => {
//       cards.forEach((item) => {
//         if (item.barcode === selectedCard) {
//           newFakeCards.push(item);
//         }
//       });
//     });
//     setFakeCards(newFakeCards);
//   }, [selectedCards, cards, flag]);

//   const changeCards = () => {
//     setFlag(true);
//   };

//   // console.log(selectedCards)
//   return (
//     <>
//       {flag ? (
//         <div className="nogoods__container">
//           <div className="main__left-column" />
//           <div className="main__center-column">
//             <h2 className="nogoods__title nogoods__title_plus">Отсканируйте бейдж бригадира дляподтверждения</h2>
//             <CardList
//               cards={fakeCards}
//               cardBarcode={cardBarcode}
//               checkedCards={checkedCards}
//               selectedCards={selectedCards}
//               setSelectedCards={setSelectedCards}
//             />
//           </div>
//           <div className="main__right-column">
//             <UniButton currentPage="nogoodspage" name="Позвать бригадира" changeCards={handleCallBrigButton} />
//           </div>
//         </div>
//       ) : (
//         <div className="nogoods__container">
//           <div className="main__left-column" />
//           <div className="main__center-column">
//             <h2 className="nogoods__title">Какого товара нет?</h2>
//             <CardList
//               cards={cards}
//               cardBarcode={cardBarcode}
//               checkedCards={checkedCards}
//               selectedCards={selectedCards}
//               setSelectedCards={setSelectedCards}
//             />
//           </div>
//           <div className="main__right-column">
//             <UniButton currentPage="nogoodspage" name="Далее" changeCards={changeCards} />
//           </div>
//         </div>
//       )}
//       <Footer IsKeyboardButtonActive={IsKeyboardButtonActive} />
//       <ForemanTooltip isOpen={isForemanTooltipOpen} />

//     </>
//   );
// }

// export default NoGoodspage;
