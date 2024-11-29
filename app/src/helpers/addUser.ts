// @ts-nocheck

export function addUser({ name, password, role }) {
  fetch("/api/create-account", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
      email: "N/A",
      role,
    }),
  }).then((response) => response.json().then((resp) => console.log(resp)));
}
