import * as formik from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Userlogin } from "../types/common";
import { loginUser } from "../util/api";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

function Login() {
  const { Formik } = formik;

  const initialValues: Userlogin = {
    email: "",
    password: "",
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });

  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values: Userlogin) => {
        loginUser(values)
          .then((data) => {
            const token = data.accessToken;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(data.user));

            Swal.fire({
              title: "Success!",
              text: "You have successfully logged in!",
              background: "#242424",
              icon: "success",
              timer: 10000,
            });
             
            navigate("/");
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: `Invalid ${err.response.data.err}!}`,
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
              marginTop: "15rem",
              padding: "3rem",
              borderRadius: "1rem",
              boxShadow: "0 0 1rem #000",
            }}
            fluid="md">
            <div className="lead fs-3 my-2">Sign In</div>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.email}
            </Form.Control.Feedback>
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="d-flex flex-column justify-content-center align-items-center">
              <Form.Group controlId="validationFormik01">
                <Form.Label className="text-center lead fs-4">Email</Form.Label>
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
                <Form.Label className="text-center lead fs-4 mt-2">
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
                />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
              </Form.Group>
              <Button className="mt-3" type="submit">
                Login
              </Button>
            </Form>
            <Link to={'/register'}>Register</Link>
          </Container>
        </>
      )}
    </Formik>
  );
}

export default Login;
