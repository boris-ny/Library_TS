import { User} from "../types/common";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { registerUser } from "../util/api";

function Register() {
  const { Formik } = formik;
  const initialValues: User = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),

    password2: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),

    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name is too short - should be 2 chars minimum"),

    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name is too short - should be 2 chars minimum"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values: User, { resetForm }) => {
        registerUser(values)
          .then(( ) => {
        
            Swal.fire({
              title: "Success!",
              text: "New user has been created!",
              background: "#242424",
              icon: "success",
              timer: 10000,
            });
            resetForm();
          })
          .catch(() => {

            Swal.fire({
              title: "Error!",
              text: "Something went wrong!",
              background: "#242424",
              icon: "error",
              timer: 10000,
            });
          });
      }}>
      {({ handleSubmit, handleChange, values, errors }) => (
        <>
          <Container
            className="w-25 d-flex flex-column justify-content-center align-items-center"
            style={{
              marginTop: "5rem",
              padding: "3rem",
              borderRadius: "1rem",
              boxShadow: "0 0 1rem #000",
            }}
            fluid="md">
            <div className="lead fs-3 my-2">Sign Up</div>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.email}
            </Form.Control.Feedback>
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="d-flex flex-column justify-content-center align-items-center">
              <Form.Group controlId="validationFormik101">
                <Form.Label className="text-center lead fs-5">First Name</Form.Label>
                <Form.Control
                  required
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik102">
                <Form.Label className="text-center lead fs-5">Last Name</Form.Label>
                <Form.Control
                  required
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik103">
                <Form.Label className="text-center lead fs-5">Email</Form.Label>
                <Form.Control
                  required
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik01">
                <Form.Label className="text-center lead fs-5 mt-2">
                  Password
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  autoComplete="on"
                  
                />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationFormik104">
                <Form.Label className="text-center lead fs-5 mt-2">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={values.password2}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  autoComplete="on"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password2}
                </Form.Control.Feedback>
              </Form.Group>
              <Button className="mt-3" type="submit">
                Sign Up
              </Button>
            </Form>
          </Container>
        </>
      )}
    </Formik>
  );
}

export default Register;
