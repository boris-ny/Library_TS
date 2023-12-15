import React, { useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HeaderBar from "../../components/Header";

export const GenreDetails = () => {
  const [genreDetail, setGenreDetail] = React.useState<any>({});
  const params = useParams<{ id: string }>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGenreDetail = async () => {
      if (!params.id) {
        return "Wrong ID";
      }
      try {
        const url = "http://localhost:5000/genres/" + params.id;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGenreDetail(response.data.data);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        return errorMessage;
      }
    };
    fetchGenreDetail();
  });
  return (
    <>
      <HeaderBar />
      <Container className="fs-5 mt-5">
        <ul className="mt-2" key={genreDetail.id}>
          <h2>Genre: {genreDetail.name}</h2>
          <div>
            <h4>Books</h4>
            {genreDetail.Books
              ? genreDetail.Books.map((book: any) => (
                  <div key={book.id}>
                    <Link to={`/book/${book.id}`} className="fs-4">
                      {book.title}
                    </Link>
                    <li>{book.summary}</li>
                  </div>
                ))
              : "No books"}
          </div>
          <div></div>
        </ul>
      </Container>
    </>
  );
};
export default GenreDetails;
