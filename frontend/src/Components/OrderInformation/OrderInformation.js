/* eslint-disable no-nested-ternary */
import "./OrderInformation.css";

function OrderInformation({ allBarcodesFromBackend }) {
  return (
    <div className="orderInformation__container">
      <h1 className="orderInformation__title">Сканировать из B-09</h1>
      <div className="orderInformation__sub-container">
        <p className="orderInformation__text">
          {allBarcodesFromBackend.length === 1
            ? "1 товар"
            : allBarcodesFromBackend.length >= 2 &&
              allBarcodesFromBackend.length <= 4
            ? `${allBarcodesFromBackend.length} товара`
            : `${allBarcodesFromBackend.length} товаров`}
        </p>
      </div>
      <div className="orderInformation__sub-container">
        <p className="orderInformation__text">Почта России</p>
      </div>
    </div>
  );
}

export default OrderInformation;
