import { Userlogin } from "../types/common";
import axios from "axios";

const url = import.meta.env.VITE_DB_URL;

// const registerUser = async (data: User) => {
//   return await fetch("http://localhost:5000/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   }).then((res) => res.json());
// };

export const registerUser = async (data: Userlogin) => {
  return await axios
    .post(`${url}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

export const loginUser = async (data: Userlogin) => {
  return await axios
    .post(`${url}/auth`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};
