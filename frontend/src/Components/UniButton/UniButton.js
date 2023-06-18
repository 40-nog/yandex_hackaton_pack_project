import "./UniButton.css";
import { useLocation, useNavigate } from "react-router-dom";

function Button({
  currentPage,
  finishDefectprocessing,
  name,
  getOrder,
  finishOrder,
  changeCards,
  clearState,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (currentPage === "homepage") {
      getOrder();
    }
    if (currentPage === "main") {
      finishOrder();
    }
    if (currentPage === "readypage") {
      clearState();
      navigate("/");
    }
    if (currentPage === "defectpage") {
      finishDefectprocessing();
    }
    if (currentPage === "nogoodspage") {
      changeCards();
    }
    return null;
  };

  const getButtonClass = () => {
    if (location.pathname === "/") {
      return "uniButton__home";
    }
    if (location.pathname === "/main") {
      return "uniButton__main";
    }
    return "uniButton__ready";
  };

  return (
    <button
      className={`uniButton ${getButtonClass()}`}
      type="button"
      aria-label="button"
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

export default Button;
