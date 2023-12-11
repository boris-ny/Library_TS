/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { Book } from "../../types/common";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Headerbar from "../../components/Header";

const Bookdetail = () => {
  const [bookdetail, setBookdetail] = React.useState<Book>({} as Book);

  const params = useParams<{ id: string }>();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchBookdetail = useCallback(async () => {
    if (!params.id) {
      return "Wrong ID";
    }
    try {
      const url = `${import.meta.env.VITE_DB_URL}/books/` + params.id;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookdetail(response.data.data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      return errorMessage;
    }
  }, [params.id, token]);

  const deleteBook = useCallback(async () => {
    if (!params.id) {
      return "Wrong ID";
    }
    try {
      const url = `${import.meta.env.VITE_DB_URL}/books/` + params.id;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "You have successfully deleted the book!",
        background: "#242424",
        icon: "success",
        timer: 10000,
      });
      navigate("/books");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      alert(errorMessage);
    }
  }, [navigate, params.id, token]);

  React.useEffect(() => {
    fetchBookdetail();
  }, []);

  return (
    <>
      <Headerbar />
      <Container className="fs-5 mt-5">
        <ul key={bookdetail.id}>
          <h1>{bookdetail.title}</h1>
          <p>
            <strong>Author</strong> :
            <Link
              to={`/authors/${bookdetail.Author ? bookdetail.Author.id : ""}`}>
              {bookdetail.Author
                ? `${bookdetail.Author.first_name} ${bookdetail.Author.family_name}`
                : ""}
            </Link>
          </p>
          <p>
            <strong>Summary</strong> : {bookdetail.summary}
          </p>
          <p>
            <strong>ISBN</strong> : {bookdetail.isbn}
          </p>
          <p>
            <strong>Genre</strong> :
            {bookdetail.Genre ? bookdetail.Genre.name : ""}
          </p>
        </ul>
        <Button variant="danger" onClick={deleteBook}>
          Delete
        </Button>
      </Container>
    </>
  );
};

export default Bookdetail;
