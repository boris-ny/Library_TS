import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import "./Books.css";
import { Link } from "react-router-dom";
import { fetchBooksDetails } from "./BookService";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchBooksDetails().then((res) => {
      if (res.data) {
        setBooks(res.data);
      }
      if (res.error) {
        setError(res.error);
      }
      setIsLoading(false);
    });
  }, []);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  if (isLoading) {
    return <div>The Page is Loading ...</div>;
  }

  return (
    <>
      <Container>
        <div>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <h1>Books</h1>
              <Button variant="primary" className="mb-3">
                <Link to="/books/create" style={{
                  color: "white",
                  textDecoration: "none"
                }}>Add new book</Link>
              </Button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Summary</th>
                  <th>ISBN</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody className="">
                {books.map((book: any) => {
                  if (!book.genreId) {
                    console.warn(
                      `Book with id ${book.id} does not have a genre.`
                    );
                  }
                  return (
                    <tr key={book.id}>
                      <td>
                        <Link to={`/book/${book.id}`}>{book.title}</Link>
                      </td>
                      <td>
                        <Link
                          to={`/authors/${book.Author ? book.Author.id : ""}`}>
                          {book.Author
                            ? `${book.Author.first_name} ${book.Author.family_name}`
                            : ""}
                        </Link>
                      </td>
                      <td>{book.summary}</td>
                      <td>{book.isbn}</td>
                      <td>
                        <Link to={`/genre/${book.Genre ? book.Genre.id : ""}`}>
                          {book.Genre ? book.Genre.name : "No genre"}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Books;
