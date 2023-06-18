import { useState } from "react";
import "../Problempage.css";
import Footer from "../../Footer/Footer";
import ProblempageOptionButton from "../ProblempageOptionButton/ProblempageOptionButton";
import ForemanTooltip from "../ForemanTooltip/ForemanTooltip";

function ProblempageMain() {
  const [IsKeyboardButtonActive, setIsKeyboardButtonActive] = useState(false);
  const [anotherProblem, setAnotherProblem] = useState(false);
  const [isForemanTooltipOpen, setIsForemanTooltipOpen] = useState(false);

  const handleCallBrigButton = () => {
    setIsForemanTooltipOpen(true);
  };

  const handleAnotherProblemButton = () => {
    setAnotherProblem(true);
    setIsKeyboardButtonActive(false);
  };

  const handleDeviceProblem = () => {
    setIsForemanTooltipOpen(true);
  };

  return (
    <>
      <div
        className={`problempage__container ${
          anotherProblem ? "problempage__container_another-problem" : ""
        }`}
      >
        {!anotherProblem && (
          <>
            <ProblempageOptionButton
              name="Проблема с техникой"
              handleButtonClick={handleAnotherProblemButton}
            />
            <ProblempageOptionButton
              name="Позвать бригадира"
              handleButtonClick={handleCallBrigButton}
            />
          </>
        )}
        {anotherProblem && (
          <>
            <ProblempageOptionButton
              name="Сломан монитор"
              handleButtonClick={handleDeviceProblem}
            />
            <ProblempageOptionButton
              name="Сломан сканер"
              handleButtonClick={handleDeviceProblem}
            />
            <ProblempageOptionButton
              name="Сломан принтер"
              handleButtonClick={handleDeviceProblem}
            />
          </>
        )}
      </div>
      <Footer IsKeyboardButtonActive={IsKeyboardButtonActive} />
      <ForemanTooltip isOpen={isForemanTooltipOpen} />
    </>
  );
}

export default ProblempageMain;
