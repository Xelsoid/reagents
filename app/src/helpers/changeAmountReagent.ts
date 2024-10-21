export async function reagentAmountChanger(uuidReagent, newAmount = 866) {
  fetch("/api/updateReagentAmount", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || "token"}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid: uuidReagent,
      amount: newAmount,
    }),
  }).then((response) => response.json().then((resp) => console.log(resp)));
}
