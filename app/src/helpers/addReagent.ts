// @ts-nocheck
export function addReagent({
  id,
  name,
  amount,
  minAmount,
  unit,
  supplier,
  producer,
  storageConditions,
  storagePlace,
}) {
  fetch("/api/addReagent", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      amount,
      minAmount,
      unit,
      supplier,
      producer,
      storageConditions,
      storagePlace,
      isDeleted: false,
    }),
  }).then((response) => response.json().then((resp) => console.log(resp)));
}
