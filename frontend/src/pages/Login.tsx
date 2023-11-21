import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Userlogin } from "../types/common";
import * as Yup from "yup";
import Swal from "sweetalert2";

function Login() {
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

  const loginUser = async (data: Userlogin) => {
    return await fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        loginUser(values)
          .then((data) => {
            console.log(data);
            const token = data.accessToken;
            localStorage.setItem("token", token);

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
            console.log(err);

            Swal.fire({
              title: "Error!",
              text: "Invalid email or password!",
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
              <FaSignInAlt />
              Sign in to continue
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
                <div className="form-button">
                  <button
                    type="submit"
                    className={`btn btn-block ${
                      !(dirty && isValid) ? "disabled-btn" : ""
                    }`}
                    disabled={!(dirty && isValid)}>
                    Sign In
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

export default Login;
