// @ts-nocheck
import { deleteCustomerDataFromStorage } from "./manageCustomerDataStorage";

export async function updateReagentAmount(
  uuidReagent: string,
  newAmount: number,
) {
  try {
    const response = await fetch("/api/updateReagentAmount", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: uuidReagent,
        amount: newAmount,
      }),
    });
    if (response.ok) {
      const data = response.json();
      console.log(data);
    } else {
      if (response.status === 401) {
        deleteCustomerDataFromStorage();
        // TODO: переделать, это какя-то хуйня
      }
      throw new Error(`HTTP-Error: ${response.status}`);
    }
  } catch (e) {
    alert(`Something went wrong. ${e.message}`);
  } finally {
    window.location.reload();
  }
}
