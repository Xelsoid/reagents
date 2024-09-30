export function addReagent (id, name, amount, 
  minAmount, unit, supplier, producer, 
  storageConditions, storagePlace
) {
  fetch("/api/api/addReagent", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token') || 'token'}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      amount: amount,
      minAmount: minAmount,
      unit: unit,
      supplier: supplier,
      producer: producer,
      storageConditions: storageConditions,
      storagePlace: storagePlace,
      isDeleted: false
    }),
  }).then(response => response.json()
.then(resp => console.log(resp)));
}
