import React from "react";
import { Book } from "../../types/common";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Bookdetail = () => {
  const [bookdetail, setBookdetail] = React.useState<Book>({} as Book);

  const params = useParams<{ id: string }>();

  const token = localStorage.getItem("token");

  const fetchBookdetail = async () => {
    if (!params.id) {
      return;
    }

    try {
      const url = "http://localhost:5000/books/" + params.id;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookdetail(response.data.data);
    } catch (error:any) {
      const errorMessage = error?.response?.data?.message;
      return errorMessage;
    }
  };

  React.useEffect(() => {
    fetchBookdetail();
  });

  return (
    <>
      <Container className="fs-5 mt-5">
        <ul className="" key={bookdetail.id}>
          <h1>{bookdetail.title}</h1>
          <p>
            <strong>Author</strong>: {bookdetail.authorId}
          </p>
          <p>
            <strong>Summary</strong>: {bookdetail.summary}
          </p>
          <p>
            <strong>ISBN</strong>: {bookdetail.isbn}
          </p>
          <p>
            <strong>Genre</strong>: {bookdetail.Genre.name}
          </p>
        </ul>
      </Container>
    </>
  );
};

export default Bookdetail;
