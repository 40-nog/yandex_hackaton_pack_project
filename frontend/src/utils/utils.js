const getBoxNameByBarcode = (barcode) => {
  switch (barcode) {
    case 100:
      return "Коробка YMA";
    case 110:
      return "Коробка YMC";
    case 120:
      return "Коробка YME";
    case 130:
      return "Коробка YMF";
    case 140:
      return "Коробка YMG";
    case 350:
      return "Пакет MYB";
    case 360:
      return "Пакет MYC";
    case 340:
      return "Пакет MYA";
    case 370:
      return "Пакет MYD";
    case 260:
      return "Стретч-пленка";
    case 380:
      return "Пакет MYE";
    case 290:
      return "Коробка YMW";
    case 310:
      return "Коробка MYF";
    case 300:
      return "Коробка YMX";
    case 180:
      return "Коробка YML";
    case 250:
      return "Нет упаковки";
    default:
      return "";
  }
};

const generateUniqueKey = () => Math.random().toString(36).substring(2, 9);

const recommendedBoxes = [];

const convertToBoxArray = (barcodeData) => {
  recommendedBoxes.shift();
  recommendedBoxes.push({
    id: generateUniqueKey(),
    name: getBoxNameByBarcode(barcodeData),
    barcode: barcodeData,
  });

  return recommendedBoxes;
};

function convertToBarcodeArray(data) {
  const boxes = [];
  if (typeof data.carton === "number") {
    boxes.push(data.carton);
  }
  data.items.forEach((item) => {
    if (typeof item.barcode === "number" && item.amount >= 1) {
      boxes.push(...Array(item.amount).fill(item.barcode));
    }
  });
  return boxes;
}

function transformMultiplyBarcodes(data) {
  return data.flatMap((item) => {
    if (item.amount === 1) {
      return item.barcode;
    }
    return item.multiplyBarcodes;
  });
}

export {
  getBoxNameByBarcode,
  convertToBoxArray,
  generateUniqueKey,
  convertToBarcodeArray,
  recommendedBoxes,
  transformMultiplyBarcodes,
};
