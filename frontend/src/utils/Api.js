const checkResponse = (res) => {
  if (res.status === 204) {
    // eslint-disable-next-line prefer-promise-reject-errors
    throw new Error("В очереди нет заказов");
  }
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    throw new Error(data.detail);
  });
};

export const finishOrder = (order) =>
  fetch(`http://localhost:8080/pack_order/${order.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_completed: order.is_completed,
      user_id: order.user_id,
      comment: order.comment,
      used_cartons: order.used_cartons,
    }),
  }).then(checkResponse);

export const getOrder = () =>
  fetch(`http://localhost:8080/pack_order`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
