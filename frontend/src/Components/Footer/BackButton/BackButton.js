import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      type="button"
      className="footer__button footer__button_back"
      onClick={() =>
        location.pathname === "/problempage-main" ? navigate("/") : navigate(-1)
      }
    >
      <p className="footer__button-text footer__button-text_back">Назад</p>
    </button>
  );
}

export default BackButton;
