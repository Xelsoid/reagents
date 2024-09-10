export function loginUser(name, passwordUser) {
  fetch("/api/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      password: passwordUser,
    }),
  }).then(response => response.json()
.then(resp => {
  localStorage.setItem('token', resp.token)
  console.log(resp)}));
}
