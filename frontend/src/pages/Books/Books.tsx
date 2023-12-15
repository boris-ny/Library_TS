import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import EditButton from "../../assets/edit.svg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { fetchBooksDetails, updateBook } from "../../util/api";
import { Book, PermissionLevel } from "../../types/common";
import BookUpdateModal from "../../components/BookUpdateModal";
import Swal from "sweetalert2";
import Headerbar from "../../components/Header";
import { Guard } from "../../components/Guard.component";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book>();

  const handleClose = () => setShow(false);

  const handleSubmit = (values: Book, { resetForm }) => {
    if (currentBook && currentBook.id) {
      updateBook(values, currentBook.id)
        .then(() => {
          localStorage.getItem("token");
          Swal.fire({
            title: "Success!",
            text: "Book has been updated.",
            icon: "success",
            confirmButtonText: "Ok",
          });
          resetForm({});
          setShow(false);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };
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
      <Headerbar />
      <Container>
        <div>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <h1>Books</h1>

              <Guard requiredRoles={[PermissionLevel.ADMIN]}>
                <Button variant="primary" className="mb-3">
                  <Link
                    to="/books/create"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}>
                    Add new book
                  </Link>
                </Button>
              </Guard>
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
                      <td>
                        <Guard requiredRoles={[PermissionLevel.ADMIN]}>
                        <Button
                          variant="outline-secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            setCurrentBook(book);
                          }}>
                          <Image src={EditButton} />
                          </Button>
                        </Guard>
                      </td>
                    </tr>
                  );
                })}
                {currentBook && (
                  <BookUpdateModal
                    show={show}
                    handleClose={handleClose}
                    book={currentBook}
                    onSubmit={handleSubmit}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Books;
