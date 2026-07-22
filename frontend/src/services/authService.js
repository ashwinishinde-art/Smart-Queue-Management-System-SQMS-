import API from "./api";

export const loginUser = async (loginData) => {
  const response = await API.post("/auth/login", loginData);
  return response.data;
};

export const registerUser = async (registerData) => {
  const response = await API.post("/auth/register", registerData);
  return response.data;
};

export const getCurrentUser = async () => {
  const token = sessionStorage.getItem("token");

  const response = await API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
