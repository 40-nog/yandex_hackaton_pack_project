import "./Footer.css";
import { useLocation } from "react-router-dom";
import NdaBox from "./NdaBox/NdaFox";
import KeyboardButton from "./KeyboardButton/KeyboardButton";
import BackButton from "./BackButton/BackButton";

function Footer({ IsKeyboardButtonActive }) {
  const location = useLocation();

  return (
    <footer
      className={`footer ${
        location.pathname === "/problempage" ||
        location.pathname === "/problempage-main" ||
        location.pathname === "/defectpage" ||
        location.pathname === "/nogoodspage"
          ? "footer__anomaly"
          : ""
      }`}
    >
      <div className="footer__box">
        <div
          className={`button__box ${
            location.pathname === "/main" ? "button__box_main" : ""
          }`}
        >
          {location.pathname === "/main" && <KeyboardButton />}
          {location.pathname === "/keyboardpage" ||
          location.pathname === "/problempage-main" ||
          location.pathname === "/problempage" ||
          location.pathname === "/defectpage" ||
          location.pathname === "/nogoodspage" ? (
            <>
              <BackButton />
              {IsKeyboardButtonActive && <KeyboardButton />}
            </>
          ) : null}
        </div>
      </div>
      <NdaBox />
    </footer>
  );
}

export default Footer;
