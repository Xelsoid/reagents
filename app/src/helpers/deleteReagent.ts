export function deleteReagent (uuid) {
  fetch("/api/api/deleteReagent", {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token') || 'token'}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid: uuid,
    }),
  }).then(response => response.json()
.then(resp => console.log(resp)));
}
