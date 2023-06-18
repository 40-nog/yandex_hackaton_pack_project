import "./ForemanTooltip.css";

export default function InfoTooltip({ isOpen }) {
  return (
    <section
      className={`foreman-tooltip ${isOpen ? "foreman-tooltip_opened" : ""}`}
    >
      <div className="foreman-tooltip__container">
        <h3 className="foreman-tooltip__title">Бригадир скоро придет</h3>
        <p className="foreman-tooltip__subtitle">Подождите немного</p>
      </div>
    </section>
  );
}
