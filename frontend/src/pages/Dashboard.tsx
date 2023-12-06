import Image from "react-bootstrap/Image";
import LocalImage from "../assets/local-library.jpg";
import Container from "react-bootstrap/Container";
import { fetchBooksDetails } from "../util/api";
import { useState, useEffect } from "react";
import { fetchGenresDetails } from "./Genres/GenresServices";
import { fetchAuthorsDetails } from "./Authors/AuthorsService";
import { fetchBookinstancesDetails } from "./Bookinstances/BookinstancesService";
import { Row, Col } from "react-bootstrap";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [copies, setCopies] = useState([]);

  useEffect(() => {
    fetchBookinstancesDetails().then((res) => {
      res.data ? setCopies(res.data) : "";
    });

    fetchAuthorsDetails().then((res) => {
      res.data ? setAuthors(res.data) : "";
    });

    fetchGenresDetails().then((res) => {
      res.data ? setGenres(res.data) : "";
    });

    fetchBooksDetails().then((res) => {
      res.data ? setBooks(res.data) : "";
    });
  }, []);

  return (
    <>
      <Container style={{
        maxWidth: "100%",
      }}>
        <Row >
          <Col style={{
            paddingRight: "0px"
          }}>
            <Container className="my-5 py-5">
              <div className="fs-3 mt-4 text-justify">
                <span className="lead fs-2 text-center">
                  Welcome to Local Library, a very basic Express website
                  developed as a learning project on the Mozilla Developer
                  Network.
                </span>
                <Container className="mt-4">
                  <h2>Local Library Catalog</h2>
                  <div className="list-unstyled">
                    <ul
                      className="text-"
                      style={{
                        listStyleType: "none",
                      }}>
                      <li> Total Books: {books.length} </li>
                      <li>Total Authors: {authors.length}</li>
                      <li>Total Copies: {copies.length}</li>
                      <li>Genres: {genres.length}</li>
                    </ul>
                  </div>
                </Container>
              </div>
            </Container>
          </Col>
          <Col style={{
            paddingRight: "0px",
          }}>
            <Image
              loading="lazy"
              src={LocalImage}
              fluid
              style={{ maxHeight: "93vh", width: "150%" }}
              width={"auto"}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
