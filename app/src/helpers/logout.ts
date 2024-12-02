export const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("name");
};
