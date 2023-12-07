/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: string;
  role: string;
}

const HeaderUserName = (props) => {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<User>({} as User);

  const fetchUserDetails = useCallback(async () => {
    const url = import.meta.env.VITE_DB_URL;
    const token = localStorage.getItem("token");
   const userId = JSON.parse(localStorage.getItem("user")|| "");

    try {
      const response = await axios.get(`${url}/users/${userId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (error: any) {
      return error?.response?.data?.message;
    }
  }, [params.id]);
  React.useEffect(() => {
    fetchUserDetails();
  }, []);
  

  return (
    <>
      <div className="d-flex" onClick={props.onClick}>
        <div
          className="mx-1"
          style={{
            color: "white",
          }}>
          {user?.firstName}
        </div>
        <Icon fontSize={30} color="white" icon="mingcute:user-4-fill" />
      </div>
    </>
  );
};

export default HeaderUserName;
