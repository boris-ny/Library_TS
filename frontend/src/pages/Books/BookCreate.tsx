import React, { useState } from "react";
import * as Yup from "yup";
import { Book } from "../../types/common";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import { Container } from "react-bootstrap";
import { fetchAuthorsDetails } from "../Authors/AuthorsService";
import { fetchGenresDetails } from "../Genres/GenresServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../util/api";

const BookCreate = () => {
  const { Formik } = formik;
  const initialValues: Book = {
    title: "",
    authorId: 0,
    summary: "",
    isbn: "",
    genreId: 0,
    
  };
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  React.useEffect(() => {
    fetchAuthorsDetails().then((res) => {
      if (res.data) {
        setAuthors(res.data);
      }
    });

    fetchGenresDetails().then((res) => {
      if (res.data) {
        setGenres(res.data);
      }
    });
  }, []);
  const navigate = useNavigate();

  const BookSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    summary: Yup.string().required("Summary is required"),
    genreId: Yup.string().required("Author is required"),
    isbn: Yup.string().required("ISBN is required"),
    authorId: Yup.string().required("Genre is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BookSchema}
      onSubmit={(values: Book, { resetForm }) => {
        console.log(values);
        
        createBook(values)
          .then(() => {
            localStorage.getItem("token");

            Swal.fire({
              title: "Success!",
              text: "You have successfully created a new book!",
              background: "#242424",
              icon: "success",
              timer: 10000,
            });
            resetForm();
            navigate("/books");
          })
          .catch((err) => {
            console.log(err);

            Swal.fire({
              title: "Error!",
              text: "Something went wrong! Please try again.",
              background: "#242424",
              icon: "error",
              timer: 10000,
            });
          });
      }}>
      {({ handleSubmit, handleChange, values, errors }) => (
        <>
          <Container className="d-flex justify-content-between align-items-center flex-column">
            <div className="mt-5">
              <h1>Add new book</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="summary">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="summary"
                  placeholder="Enter summary"
                  value={values.summary}
                  onChange={handleChange}
                  isInvalid={!!errors.summary}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.summary}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  as="select"
                  name="authorId"
                  onChange={handleChange}
                  isInvalid={!!errors.authorId}>
                  <option value="">Select author</option>
                  {authors.map((author: any) => (
                    <option key={author.id} value={author.id}>
                      {author.first_name} {author.family_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.authorId}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="isbn"
                  placeholder="Enter ISBN"
                  value={values.isbn}
                  onChange={handleChange}
                  isInvalid={!!errors.isbn}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isbn}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="genre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  as="select"
                  name="genreId"
                  onChange={handleChange}
                  isInvalid={!!errors.genreId}>
                  <option value="">Select genre</option>
                  {genres.map((genre: any) => (
                    <option value={genre.id} key={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.genreId}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                size="lg"
                className="mt-4 px-5"
                variant="primary"
                type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </>
      )}
    </Formik>
  );
};

export default BookCreate;
