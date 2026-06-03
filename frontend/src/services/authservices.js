import axios from "axios";

export const loginUser = (data) => {
  return axios.post("/api/auth/login", data);
};

export const registerUser = (data) => {
  return axios.post("/api/auth/signup", data);
};