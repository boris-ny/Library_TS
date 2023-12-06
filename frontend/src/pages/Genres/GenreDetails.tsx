import React, { useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

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
      <Container className="fs-5 mt-5">
        <ul className="mt-2" key={genreDetail.id}>
          <h3>Genre: {genreDetail.name}</h3>
          <div>
            <h4>Books</h4>
            {genreDetail.Books &&
              genreDetail.Books.map((book: any) => (
                <div key={book.id}>
                  
                  <Link to={`/book/${book.id}`}>
                    {book.title}
                  </Link>
                  <div>{book.summary}</div>
                </div>
              ))}
          </div>
          <div></div>
        </ul>
      </Container>
    </>
  );
};
export default GenreDetails;
