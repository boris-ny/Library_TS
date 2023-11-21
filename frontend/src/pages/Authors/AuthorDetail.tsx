import axios from "axios";

import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const AuthorDetail = () => {
  const [authorDetail, setAuthorDetail] = React.useState<any>({});

  const params = useParams<{ id: string }>();

  const token = localStorage.getItem("token");

  const fetchAuthorDetail = async () => {
    if (!params.id) {
      return;
    }

    try {
      const url = "http://localhost:5000/authors/" + params.id;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthorDetail(response.data.data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      return errorMessage;
    }
  };

  React.useEffect(() => {
    fetchAuthorDetail();
  });

  return (
    <>
      <Container className="fs-5 mt-5">
        <ul className="" key={authorDetail.id}>
          <h1>
            {authorDetail.first_name} {authorDetail.family_name}
          </h1>
          <li>
            <strong>Date of Birth</strong>: {authorDetail.date_of_birth}
          </li>
          <li>
            <strong>Date of Death</strong>: {authorDetail.date_of_death}
          </li>
        </ul>
      </Container>
    </>
  );
};

export default AuthorDetail;
