import failedPicture from "../../images/error_icon_tooltip.svg";
import "./InfoTooltip.css";

export default function InfoTooltip({ isOpen, onClose, text }) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img className="popup__pic" src={failedPicture} alt={text} />
        <p className="popup__title">{text}</p>
        <button onClick={onClose} className="popup__close" type="button">
          <div className="popup__close-icon" />
        </button>
      </div>
    </section>
  );
}
