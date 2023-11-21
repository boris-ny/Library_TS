import { FaUser } from "react-icons/fa";
import { User } from "../types/common";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

function Register() {
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

  // const fetchUsers = async () => {
  //   const response = await fetch("http://localhost:5000/users", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInBlcm1pc3Npb25MZXZlbCI6MSwiaWF0IjoxNjk5OTY2NDY5LCJleHAiOjE3MDAzOTg0Njl9.8Ov8ThaaMAQKZcYyw2IO2lvOd9w0pZUGaJwurBIchGIn",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const registerUser = async (data: User) => {
    return await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values, { resetForm }) => {
        registerUser(values)
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Success!",
              text: "New user has been created!",
              background: "#242424",
              icon: "success",
              timer: 10000,
            });
            resetForm();
          })
          .catch((err) => {
            console.log(err);

            Swal.fire({
              title: "Error!",
              text: "Something went wrong!",
              background: "#242424",
              icon: "error",
              timer: 10000,
            });
          });
      }}>
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;

        console.log(errors);

        return (
          <>
            <div className="heading">
              <FaUser />
              Please 
            </div>
            <div className="form">
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className={
                      errors.email && touched.email ? "input-error" : null
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={
                      errors.firstName && touched.firstName
                        ? "input-error"
                        : null
                    }
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={
                      errors.lastName && touched.lastName ? "input-error" : null
                    }
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className={
                      errors.password && touched.password ? "input-error" : null
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <Field
                    type="password"
                    name="password2"
                    id="password2"
                    className={
                      errors.password2 && touched.password2
                        ? "input-error"
                        : null
                    }
                  />
                  <ErrorMessage
                    name="password2"
                    component="span"
                    className="error"
                  />
                </div>
                <div className="form-button">
                  <button
                    type="submit"
                    className={`btn btn-block ${
                      !(dirty && isValid) ? "disabled-btn" : ""
                    }`}
                    disabled={!(dirty && isValid)}>
                    Sign up
                  </button>
                </div>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default Register;
