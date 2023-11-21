import React, { useState } from "react";
import { fetchAuthorsDetails } from "./AuthorsService";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetchAuthorsDetails().then((res) => {
      console.log(res);
      if (res.data) {
        setAuthors(res.data);
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
          <h1>Authors</h1>
        </div>
        <ol className="fs-5">
          {authors.map((author: any) => (
            <li key={author.id}>
              <Link to={`/authors/${author.id}`}>
                {author.first_name} {author.family_name}
              </Link>
              
              <span className="ms-2">
        
                : ({author.date_of_birth} - {author.date_of_death})
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}

export default Authors;
