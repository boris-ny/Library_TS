import * as formik from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import { Button, Container, Form } from "react-bootstrap";
import { Author } from "../types/common";

interface AuthorCreateModalProps {
  author?: Author;
  show: boolean;
  handleClose: () => void;
  onSubmit: (values: Author, { resetForm }) => void;
}

const AuthorCreateModal = (props: AuthorCreateModalProps) => {
  const AuthorSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    family_name: Yup.string().required("Last Name is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    date_of_death: Yup.date(),
  });

  const { values, errors, handleChange, handleSubmit } = formik.useFormik({
    initialValues: {
      first_name: props.author?.first_name || "",
      family_name: props.author?.family_name || "",
      date_of_birth: props.author?.date_of_birth || "",
      date_of_death: props.author?.date_of_death || "",
    },
    validationSchema: AuthorSchema,
    onSubmit: props.onSubmit,
  });
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Create Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  value={values.first_name}
                  placeholder="Enter first name"
                  isInvalid={!!errors.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="family_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="family_name"
                  onChange={handleChange}
                  value={values.family_name}
                  placeholder="Enter your family name"
                  isInvalid={!!errors.family_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.family_name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="date_of_birth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  className="form-control"
                  name="date_of_birth"
                  onChange={handleChange}
                  value={String(values.date_of_birth)}
                  isInvalid={!!errors.date_of_birth}
                />
                <Form.Control.Feedback type="invalid">
                  {String(errors.date_of_birth)}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="date_of_death">
                <Form.Label>Date of Death</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_death"
                  onChange={handleChange}
                  value={String(values.date_of_death)}
                  isInvalid={!!errors.date_of_death}
                />
                <Form.Control.Feedback type="invalid">
                  {String(errors.date_of_death)}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="btn btn-primary mt-3">
                Create
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthorCreateModal;
