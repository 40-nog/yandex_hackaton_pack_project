import "./Boxes.css";
import Box from "./Box/Box";

function Boxes({ boxes, checkedBoxes }) {
  return (
    <section className="boxes">
      {boxes.map((i) => (
        <Box
          key={i.id}
          name={i.name}
          boxBarcode={i.barcode}
          checkedBoxes={checkedBoxes}
          boxes={boxes}
        />
      ))}
    </section>
  );
}

export default Boxes;
