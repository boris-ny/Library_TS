import axios from "axios";

export const fetchBookinstancesDetails = async () => {
  try {
    const url = `${import.meta.env.VITE_DB_URL}/bookinstances`;
    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data.data };
  } catch (error:any) {
    return {
      error:
        error?.response?.data?.message ??
        error.message ??
        "Something went wrong",
    };
  }
};
