
import { User, Userlogin, Book } from "../types/common";
import axios from "axios";

const url = import.meta.env.VITE_DB_URL;

// call api to register user
export const registerUser = async (data: User) => {
  return await axios
    .post(`${url}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// call api to login user
export const loginUser = async (data: Userlogin) => {
  return await axios
    .post(`${url}/auth`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};
// call api to get all books
export const fetchBooksDetails = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${url}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data.data };
  } catch (error: any) {
    return {
      error:
        error?.response?.data?.message ??
        error.message ??
        "Something went wrong",
    };
  }
};
// call api to create book
export const createBook = async (data: Book) => {
  const token = localStorage.getItem("token");
  return await axios
    .post(`${url}/books`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);
};
// call api to update book
export const UpdateBook = async (data: Book, id:number) => {
  
  const token = localStorage.getItem("token");
  return await axios
    .put(`${url}/books/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);
};