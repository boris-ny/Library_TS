import axios from "axios";
import { User } from "../types/common";
const BACKEND_URL = "/users/";



//Register user
const register = async (userData: User) => {
  const response = await axios.post(BACKEND_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
