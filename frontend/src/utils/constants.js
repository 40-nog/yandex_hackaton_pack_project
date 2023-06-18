const convertData = (data) => {
  const amountMap = data.payload.reduce((map, payloadItem) => {
    // eslint-disable-next-line no-param-reassign
    map[payloadItem.item_id] = payloadItem.amount;
    return map;
  }, {});

  const uniqueItems = new Map();

  data.items.forEach((item) => {
    if (!uniqueItems.has(item.id) && amountMap[item.id] === 1) {
      const newItem = {
        name: item.name,
        barcode: item.barcode,
        picture: item.image,
        id: item.id,
        packageType: item.package_type,
        amount: amountMap[item.id] || 0,
      };

      if (newItem.amount > 1) {
        newItem.multiplyBarcodes = data.items
          .filter((i) => i.id === item.id)
          .map((i) => i.barcode);
      }
      uniqueItems.set(item.id, newItem);
    }
    if (!uniqueItems.has(item.id) && amountMap[item.id] > 1) {
      const newItem = {
        name: item.name,
        picture: item.image,
        id: item.id,
        packageType: item.package_type,
        amount: amountMap[item.id] || 0,
      };

      if (newItem.amount > 1) {
        newItem.multiplyBarcodes = data.items
          .filter((i) => i.id === item.id)
          .map((i) => i.barcode);
      }

      uniqueItems.set(item.id, newItem);
    }
  });

  const result = {
    order_id: data.order_id,
    cartons: data.cartons,
    items: Array.from(uniqueItems.values()),
  };

  return result;
};

const boxData = [
  {
    id: 1,
    name: "Коробка YMA",
    barcode: 100,
  },
  {
    id: 2,
    name: "Коробка YMC",
    barcode: 110,
  },
  {
    id: 3,
    name: "Коробка YME",
    barcode: 120,
  },
  {
    id: 4,
    name: "Коробка YMF",
    barcode: 130,
  },
  {
    id: 5,
    name: "Коробка YMG",
    barcode: 140,
  },
  {
    id: 6,
    name: "Пакет MYB",
    barcode: 350,
  },
  {
    id: 7,
    name: "Пакет MYC",
    barcode: 360,
  },
  {
    id: 8,
    name: "Пакет MYA",
    barcode: 340,
  },
  {
    id: 9,
    name: "Пакет MYD",
    barcode: 370,
  },
  {
    id: 10,
    name: "Стретч-пленка",
    barcode: 260,
  },
  {
    id: 11,
    name: "Пакет MYE",
    barcode: 380,
  },
  {
    id: 12,
    name: "Коробка YMW",
    barcode: 290,
  },
  {
    id: 13,
    name: "Коробка MYF",
    barcode: 310,
  },
  {
    id: 14,
    name: "Коробка YMX",
    barcode: 300,
  },
  {
    id: 15,
    name: "Коробка YML",
    barcode: 180,
  },
  {
    id: 20,
    name: "Нет упаковки",
    barcode: 250,
  },
];

const boxesBarcodes = [
  100, 110, 120, 130, 140, 350, 360, 340, 370, 260, 380, 290, 310, 300, 180,
  250,
];

const styleBoxesMap = {
  "Коробка YMA": { boxColor: "carton_blue", textColor: "carton__name_blue" },
  "Пакет MYA": { boxColor: "carton_blue", textColor: "carton__name_blue" },
  "Коробка YMC": { boxColor: "carton_green", textColor: "carton__name_green" },
  "Коробка YML": { boxColor: "carton_green", textColor: "carton__name_green" },
  "Коробка YME": {
    boxColor: "carton_lightblue",
    textColor: "carton__name_lightblue",
  },
  "Стретч-пленка": {
    boxColor: "carton_lightblue",
    textColor: "carton__name_lightblue",
  },
  "Коробка YMF": {
    boxColor: "carton_orange",
    textColor: "carton__name_orange",
  },
  "Коробка YMW": {
    boxColor: "carton_orange",
    textColor: "carton__name_orange",
  },
  "Коробка YMG": {
    boxColor: "carton_purple",
    textColor: "carton__name_purple",
  },
  "Коробка MYF": {
    boxColor: "carton_purple",
    textColor: "carton__name_purple",
  },
  "Пакет MYC": { boxColor: "carton_red", textColor: "carton__name_red" },
  "Пакет MYD": { boxColor: "carton_gray", textColor: "carton__name_gray" },
  "Пакет MYB": {
    boxColor: "carton_darkred",
    textColor: "carton__name_darkred",
  },
  "Пакет MYE": {
    boxColor: "carton_darkred",
    textColor: "carton__name_darkred",
  },
  "Нет упаковки": {
    boxColor: "carton_darkyellow",
    textColor: "carton__name_darkyellow",
  },
  "Коробка YMX": {
    boxColor: "carton_darkyellow",
    textColor: "carton__name_darkyellow",
  },
};

export { boxData, styleBoxesMap, boxesBarcodes, convertData };
