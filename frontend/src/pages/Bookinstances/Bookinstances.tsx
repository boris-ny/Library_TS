import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { fetchBookinstancesDetails } from "./BookinstancesService";

function Bookinstances() {
  const [bookinstances, setBookinstances] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchBookinstancesDetails().then((res) => {
      if (res.data) {
        setBookinstances(res.data);
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
      <Container>
        <div className="mt-5">
          <h1>Book Instances</h1>
        </div>
        <ol>
          {bookinstances.length > 0 ? (
            bookinstances.map((bookinstance: any) => (
              <li key={bookinstance.url}>
                <a href={bookinstance.url}>
                  {bookinstance.title}: {bookinstance.imprint} -
                  {bookinstance.status === "Available" && (
                    <span className="text-success ms-2">
                      {bookinstance.status}
                    </span>
                  )}
                  {bookinstance.status === "Maintenance" && (
                    <span className="text-danger ms-2">
                      {bookinstance.status}
                    </span>
                  )}
                  {bookinstance.status !== "Available" &&
                    bookinstance.status !== "Maintenance" && (
                      <span className="text-warning ms-2">
                        {bookinstance.status}
                      </span>
                    )}
                  {bookinstance.status !== "Available" && (
                    <span className="ms-2">(Due: {bookinstance.due_back})</span>
                  )}
                </a>
              </li>
            ))
          ) : (
            <li>There are no book copies in this library</li>
          )}
        </ol>
      </Container>
    </>
  );
}

export default Bookinstances;
