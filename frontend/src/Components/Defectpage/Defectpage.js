import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Defectpage.css";
import Footer from "../Footer/Footer";
import CardList from "../Card/CardList";
import UniButton from "../UniButton/UniButton";
import boxPic from "../../images/defect_box_picture.png";

function Defectpage({
  cards,
  cardBarcode,
  cardBarcodeDefect,
  checkedCards,
  sendStatusAboutFail,
}) {
  const [IsKeyboardButtonActive, setIsKeyboardButtonActive] = useState(true);
  const [isDefectProcessingFinished, setIsDefectProcessingFinished] =
    useState(false);
  const navigate = useNavigate();

  function finishDefectprocessing() {
    setIsDefectProcessingFinished(true);
    setIsKeyboardButtonActive(false);
  }

  function sendStatus() {
    sendStatusAboutFail();
    navigate("/");
  }

  return (
    <>
      <div className="defectpage__container">
        <div className="main__left-column" />
        <div
          className={`main__center-column ${
            isDefectProcessingFinished ? `defectpage__center-column` : ``
          }`}
        >
          {!isDefectProcessingFinished && (
            <>
              <h3 className="defectpage__title">
                Сканируйте бракованный товар
              </h3>
              <CardList
                cards={cards}
                cardBarcode={cardBarcode}
                cardBarcodeDefect={cardBarcodeDefect}
                checkedCards={checkedCards}
              />
            </>
          )}
          {isDefectProcessingFinished && (
            <>
              <img
                src={boxPic}
                alt="изображение коробки"
                className="defectpage__pic"
              />
              <h3 className="defectpage__title defectpage__title_finish">
                Положите бракованные товары в тару
              </h3>
            </>
          )}
        </div>
        <div className="main__right-column">
          {cardBarcodeDefect.length !== 0 ? (
            <UniButton
              currentPage="defectpage"
              finishDefectprocessing={
                isDefectProcessingFinished ? sendStatus : finishDefectprocessing
              }
              name={isDefectProcessingFinished ? "Готово" : "Далее"}
            />
          ) : null}
        </div>
      </div>
      <Footer IsKeyboardButtonActive={IsKeyboardButtonActive} />
    </>
  );
}

export default Defectpage;
