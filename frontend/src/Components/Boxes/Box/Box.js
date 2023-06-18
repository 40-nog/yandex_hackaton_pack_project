import "./Box.css";
import { styleBoxesMap } from "../../../utils/constants";

function Box({ name, boxBarcode, checkedBoxes }) {
  const { boxColor, textColor } = styleBoxesMap[name] || {};

  const isBarcodeMatched = checkedBoxes.includes(boxBarcode);

  return (
    <div
      className={`carton ${
        isBarcodeMatched ? `${boxColor} ${boxColor}_active` : `${boxColor}`
      }`}
    >
      <p
        className={`carton__name ${
          isBarcodeMatched ? `${textColor}_active` : textColor
        }`}
      >
        {name}
      </p>
    </div>
  );
}

export default Box;
