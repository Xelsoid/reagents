export function addUser(name, password, role) {
  fetch("/api/register", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || "token"}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
      email: "string",
      role,
    }),
  }).then((response) => response.json().then((resp) => console.log(resp)));
}
