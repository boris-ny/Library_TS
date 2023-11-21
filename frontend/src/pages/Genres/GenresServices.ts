import axios from "axios";

export const fetchGenresDetails = async () => {
  try {
    const url = "http://localhost:5000/genres";
    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
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
