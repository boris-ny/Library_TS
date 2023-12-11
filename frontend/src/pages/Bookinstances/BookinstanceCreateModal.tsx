import * as formik from "formik";
import * as Yup from "yup";
import { Button, Container, Form, Modal } from "react-bootstrap";
import React from "react";
import { fetchBooksDetails } from "../../util/api";

interface BookinstanceCreateModalProps {
  book: string;
  book_id: number;
  imprint: string;
  show: boolean;
  handleCLose: () => void;
  onSubmit: (values: BookinstanceCreateModalProps, { resetForm }) => void;
}

const statuses = ["Available", "Maintenance", "Loaned", "Reserved"];

const BookinstanceCreateModal = (props: any) => {
  const [books, setBooks] = React.useState([]);

  const BookinstanceSchema = Yup.object().shape({
    book_id: Yup.number().required("Please choose the book"),
    imprint: Yup.string().required("Please input the imprint the book copy"),
    status: Yup.string().required("Status of the copy is required"),
    due_back: Yup.date().required("Please input the due back date"),
  });

  React.useEffect(() => {
    fetchBooksDetails().then((res) => {
      if (res.data) {
        setBooks(res.data);
      }
    });
  }, []);

  const { values, errors, handleChange, handleSubmit } = formik.useFormik({
    initialValues: {
      book_id: props.book_id || 0,
      imprint: props.imprint || "",
      status: props.status || "",
      due_back: props.dueback || "",
    },
    validationSchema: BookinstanceSchema,
    onSubmit: props.onSubmit,
  });

  return (
    <Modal show={props.show} onHide={props.handleCloseCreate}>
      <Modal.Header closeButton={true}>
        <Modal.Title>New Copy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Book</Form.Label>
              <Form.Control
                as={"select"}
                name="book_id"
                onChange={handleChange}
                value={values.book_id}
                isInvalid={!!errors.book_id}>
                <option value="">Choose your book</option>
                {books.map((book: any) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {String(errors.book_id)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="imprint">
              <Form.Label>Imprint</Form.Label>
              <Form.Control
                type="text"
                name="imprint"
                onChange={handleChange}
                value={values.imprint}
                placeholder="Enter imprint"
                isInvalid={!!errors.imprint}
              />
              <Form.Control.Feedback type="invalid">
                {String(errors.imprint)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as={"select"}
                name="status"
                onChange={handleChange}
                isInvalid={!!errors.status}>
                <option value="">Choose status</option>
                {statuses.map((status: string) => (
                  <option key={status} value={values.status}>
                    {status}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Back</Form.Label>
              <Form.Control
                type="date"
                name="due_back"
                onChange={handleChange}
                value={String(values.due_back)}
                isInvalid={!!errors.due_back}
              />
              <Form.Control.Feedback>
                {String(errors.due_back)}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="btn btn-primary mt-3">
              Create new copy
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default BookinstanceCreateModal;
