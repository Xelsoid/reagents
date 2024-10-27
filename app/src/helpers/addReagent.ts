export function addReagent(
  id: string,
  name: string,
  amount: number,
  minAmount: number,
  unit: string,
  supplier: string,
  producer: string,
  storageConditions: string,
  storagePlace: string,
) {
  fetch("/api/addReagent", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || "token"}`,
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
