import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Book } from "../../types/common";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Container } from "react-bootstrap";
import { fetchAuthorsDetails } from "../Authors/AuthorsService";
import { fetchGenresDetails } from "../Genres/GenresServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookCreate = () => {
  const initialValues: Book = {
    title: "",
    Author: "",
    summary: "",
    isbn: "",
    Genre: "",
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

  // Create Book Service
  const createBook = async (data: any) => {
    try {
      const url = "http://localhost:5000/books";
      const token = localStorage.getItem("token");

      await axios
        .post(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          data: JSON.stringify(data),
        })
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "You have successfully created a new book!",
            background: "#242424",
            icon: "success",
            timer: 10000,
          });
          navigate("/books");
        });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong! Please try again.",
        background: "#242424",
        icon: "error",
        timer: 10000,
      });
    }
  };
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        createBook(values);
      }}>
      {(formik) => {
        const { errors, touched } = formik;

        return (
          <>
            <div className="fs-3 d-flex justify-content-center">
              Add a new Book
            </div>
            <Form className="mt-2">
              <Container className="w-25">
                <Field
                  name="title"
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type={"text"}
                        value={field.title}
                        onChange={field.onChange}
                        placeholder="Add new Book"
                        className={
                          errors.title && touched.title ? "input-error" : ""
                        }
                      />
                    </Form.Group>
                  )}
                />
                <Field
                  name="Author"
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label>Author Name</Form.Label>
                      <Form.Select
                        value={field.Author}
                        onChange={field.onChange}>
                        {authors.map((author: any) => (
                          <option key={author.id}>
                            <div>
                              {author.first_name} {author.family_name}
                            </div>
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                />

                <Field
                  name="summary"
                  render={({ field }) => (
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Summary</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={field.title}
                        onChange={field.onChange}
                        rows={3}
                        placeholder="Summary of the Book"
                        className={
                          errors.summary && touched.summary ? "input-error" : ""
                        }
                      />
                    </Form.Group>
                  )}
                />
                <Field
                  name="isbn"
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label>ISBN</Form.Label>
                      <Form.Control
                        type={"text"}
                        value={field.isbn}
                        onChange={field.onChange}
                        placeholder="ISBN of the Book"
                        className={
                          errors.isbn && touched.isbn ? "input-error" : ""
                        }
                      />
                    </Form.Group>
                  )}
                />
                <Field
                  name="Genre"
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label>Genre</Form.Label>
                      <Form.Select
                        value={field.Genre}
                        onChange={field.onChange}>
                        {genres.map((genre: any) => (
                          <option key={genre.id}>
                            <div>{genre.name}</div>
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                />
              </Container>
              <Container className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  <span className="p-5 fs-4">Submit</span>
                </Button>
              </Container>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default BookCreate;
