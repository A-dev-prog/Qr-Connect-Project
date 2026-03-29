export const getToken = () => {
  return localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  navigate("/login");
};