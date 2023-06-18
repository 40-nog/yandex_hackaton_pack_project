/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Homepage from "../Homepage/Homepage";
import Problempage from "../Problempage/Problempage";
import Defectpage from "../Defectpage/Defectpage";
import NoGoodspage from "../NoGoodspage/NoGoodspage";
import NumberKeyboard from "../Keyboard/NumberKeyboard";
import ReadyPage from "../ReadyPage/ReadyPage";
import InfoToolTip from "../InfoTooltip/InfoTooltip";
import ProblempageMain from "../Problempage/ProblempageMain/ProblempageMain";
import NotFound from "../NotFound/NotFound";
import {
  convertToBoxArray,
  generateUniqueKey,
  getBoxNameByBarcode,
  recommendedBoxes,
  transformMultiplyBarcodes,
} from "../../utils/utils";
import { boxesBarcodes, convertData } from "../../utils/constants";
import * as Api from "../../utils/Api";
import Loader from "../Loader/Loader";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  /* карточки товаров */

  const [cards, setCards] = useState([]);
  const [cardBarcode, setCardBarcode] = useState([]);
  const [checkedCards, setCheckedCards] = useState([]);
  const [cardBarcodeDefect, setCardBarcodeDefect] = useState([]);
  const [checkedCardsDefect, setCheckedCardsDefeсt] = useState([]);

  /* попап */

  const [InfoTooltipText, setInfoTooltipText] = useState("Что-то пошло не так");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  /* упаковка */
  const [boxBarcode, setBoxBarcode] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [allBarcodesFromBackend, setAllBarcodesFromBackend] = useState([]);

  /* пути */
  const [currentPath, setCurrentPath] = useState(null);
  const [previousPath, setPreviousPath] = useState(null);

  /* данные заказа */
  const [comment, setComment] = useState("Заказ собран");
  const [orderId, setOrderId] = useState(0);
  const [orderIsCompleted, setOrderIsCompleted] = useState(true);

  /* лоадер */
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setPreviousPath(currentPath);
      setCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  function checkMultiplyBarcodes(data, item, value) {
    if (previousPath === "/main") {
      if (data.includes(Number(value))) {
        const newCardBarcode = [...cardBarcode, Number(value)];
        const newCheckedCards = [...checkedCards, item];
        setCheckedCards(newCheckedCards);
        setCardBarcode(newCardBarcode);
      }
    } else if (data.includes(Number(value))) {
      const newCardBarcodeDefect = [...cardBarcodeDefect, Number(value)];
      const newCheckedCardsDefect = [...checkedCardsDefect, item];
      setCheckedCardsDefeсt(newCheckedCardsDefect);
      setCardBarcodeDefect(newCardBarcodeDefect);
    }
  }

  function checkBarcode(item, value) {
    if (previousPath === "/main") {
      if (item.barcode === Number(value)) {
        const newCardBarcode = [...cardBarcode, item.barcode];
        const newCheckedCards = [...checkedCards, item];
        setCheckedCards(newCheckedCards);
        setCardBarcode(newCardBarcode);
      }
    } else if (item.barcode === Number(value)) {
      const newCardBarcodeDefect = [...cardBarcodeDefect, item.barcode];
      const newCheckedCardsDefect = [...checkedCardsDefect, item];
      setCheckedCardsDefeсt(newCheckedCardsDefect);
      setCardBarcodeDefect(newCardBarcodeDefect);
    }
  }

  function checkCards(value) {
    cards.forEach((item) => {
      const data = item.multiplyBarcodes;
      if (data) {
        checkMultiplyBarcodes(data, item, value);
      } else {
        checkBarcode(item, value);
      }
    });
  }

  function checkBoxes(value) {
    const foundItem = recommendedBoxes.find(
      (item) => item.barcode === Number(value),
    );
    if (foundItem) {
      setBoxBarcode(foundItem.barcode);
      setCheckedBoxes([foundItem.barcode, ...checkedBoxes]);
    } else if (checkedBoxes.length > 8) {
      setIsInfoTooltipPopupOpen(true);
      setInfoTooltipText("Нельзя отсканировать больше 9 коробок");
    } else {
      setBoxBarcode(+value);
      const newBox = {
        id: generateUniqueKey(),
        name: getBoxNameByBarcode(+value),
        barcode: +value,
      };
      setBoxes([newBox, ...boxes]);
      setCheckedBoxes([+value, ...checkedBoxes]);
      setComment(`Выбрана нерекомендованная упаковка`);
    }
  }

  function handleClickProblemButton() {
    setCardBarcode([]);
    setCardBarcodeDefect([]);
  }

  function closePopup() {
    setIsInfoTooltipPopupOpen(false);
  }

  function sendStatusAboutFail() {
    setComment(`бракованный товар`);
    setOrderIsCompleted(false);
    const data = {
      id: orderId,
      is_completed: orderIsCompleted,
      user_id: "123231434",
      comment,
      used_cartons: checkedBoxes,
    };
    Api.finishOrder(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setInfoTooltipText(`${err}`);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function getOrder() {
    setIsLoader(true);
    Api.getOrder()
      .then((res) => {
        const dataFromBackend = convertData(res);
        const clonedCardList = { ...dataFromBackend };
        const cardList = clonedCardList.items;
        const transformesApiData = convertData(res);
        const arrayBarcodesFromBackend = transformMultiplyBarcodes(
          transformesApiData.items,
        );
        setCards(cardList);
        setBoxes(convertToBoxArray(res.cartons[0].barcode));
        setAllBarcodesFromBackend(arrayBarcodesFromBackend);
        setOrderId(res.order_id);
        navigate("/main");
      })
      .catch((err) => {
        setInfoTooltipText(`${err}`);
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }

  function finishOrder() {
    localStorage.clear();
    const data = {
      id: orderId,
      is_completed: orderIsCompleted,
      user_id: "123231434",
      comment: "",
      used_cartons: checkedBoxes,
    };
    Api.finishOrder(data)
      .then((res) => {
        console.log(res);
        navigate("/readypage");
      })
      .catch((err) => {
        setInfoTooltipText(`${err}`);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  const handleKeyboardResult = (value) => {
    const isBoxBarcode = boxesBarcodes.includes(Number(value));
    let isDuplicateBarcode = false;
    if (previousPath === "/defectpage") {
      isDuplicateBarcode = cardBarcodeDefect.includes(Number(value));
    } else {
      isDuplicateBarcode = cardBarcode.includes(Number(value));
    }
    const isValidBarcode = allBarcodesFromBackend.includes(Number(value));

    if (allBarcodesFromBackend.length === cardBarcode.length) {
      if (isBoxBarcode) {
        checkBoxes(value);
      } else {
        setInfoTooltipText("Нет коробок с таким штрих-кодом");
        setIsInfoTooltipPopupOpen(true);
      }
    } else if (isDuplicateBarcode) {
      setInfoTooltipText("Нельзя сканировать штрих-код дважды");
      setIsInfoTooltipPopupOpen(true);
    } else if (!isValidBarcode) {
      setInfoTooltipText("Такого штрих-кода нет в заказе");
      setIsInfoTooltipPopupOpen(true);
    } else {
      checkCards(value);
    }
  };

  function clearState() {
    setCheckedBoxes([]);
    setAllBarcodesFromBackend([]);
    setAllBarcodesFromBackend([]);
    setCardBarcode([]);
    setCheckedCards([]);
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage getOrder={getOrder} />} />
        <Route
          path="main"
          element={
            isLoader ? (
              <Loader />
            ) : (
              <Main
                cardListLength={cards.length}
                boxes={boxes}
                boxBarcode={boxBarcode}
                checkedBoxes={checkedBoxes}
                cards={cards}
                checkedCards={checkedCards}
                cardBarcode={cardBarcode}
                cardBarcodeDefect={cardBarcodeDefect}
                finishOrder={finishOrder}
                allBarcodesFromBackend={allBarcodesFromBackend}
              />
            )
          }
        />
        <Route
          path="problempage"
          element={
            <Problempage
              cards={cards}
              checkedCards={checkedCards}
              cardBarcode={cardBarcode}
              handleClickProblemButton={handleClickProblemButton}
            />
          }
        />
        <Route path="problempage-main" element={<ProblempageMain />} />
        <Route
          path="defectpage"
          element={
            <Defectpage
              cards={cards}
              checkedCards={checkedCards}
              cardBarcode={cardBarcode}
              cardBarcodeDefect={cardBarcodeDefect}
              sendStatusAboutFail={sendStatusAboutFail}
            />
          }
        />
        <Route
          path="nogoodspage"
          element={
            <NoGoodspage
              cards={cards}
              checkedCards={checkedCards}
              cardBarcode={cardBarcode}
              allBarcodesFromBackend={allBarcodesFromBackend}
            />
          }
        />
        <Route
          path="readypage"
          element={<ReadyPage clearState={clearState} />}
        />
        <Route
          path="keyboardpage"
          element={<NumberKeyboard onResult={handleKeyboardResult} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InfoToolTip
        onClose={closePopup}
        isOpen={isInfoTooltipPopupOpen}
        text={InfoTooltipText}
      />
    </div>
  );
}

export default App;
