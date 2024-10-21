export function loginUser(name, passwordUser) {
  if (!name || !passwordUser) {
    alert("Введите логин и пароль");
    return;
  }
  fetch("/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password: passwordUser,
    }),
  }).then((response) =>
    response
      .json()
      .then((resp) => {
        localStorage.setItem("token", resp.token);
        localStorage.setItem("name", resp.name);
        localStorage.setItem("role", resp.role);
        window.location.href = `${window.location.href}main`;
      })
      .catch(() => alert("Invalid login or password")),
  );
}
