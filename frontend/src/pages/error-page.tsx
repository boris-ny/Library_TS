import { Container } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Container style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}
