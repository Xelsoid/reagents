export function addUser(name: string, password: string, role: string) {
  fetch("/api/create-account", {
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
