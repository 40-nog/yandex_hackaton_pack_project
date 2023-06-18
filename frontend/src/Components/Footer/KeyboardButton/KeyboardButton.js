import { Link } from "react-router-dom";

function KeyboardButton() {
  return (
    <Link className="footer__button footer__button_keyboard" to="/keyboardpage">
      <p className="footer__button-text footer__button-text_keyboard">
        Ввести с клавиатуры
      </p>
    </Link>
  );
}

export default KeyboardButton;
