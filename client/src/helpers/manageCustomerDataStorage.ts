// @ts-nocheck
export function setCustomerDataToStorage(name, role) {
  localStorage.setItem('name', name);
  localStorage.setItem('role', role);
}

export function deleteCustomerDataFromStorage(name, role) {
  localStorage.removeItem('name', name);
  localStorage.removeItem('role', role);
}
