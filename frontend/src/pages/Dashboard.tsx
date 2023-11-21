import Container from "react-bootstrap/Container";


import Books from "../pages/Books/Books";

const bookCount = Books.length;

function Dashboard() {
  return (
    <>
      <div className="">
        <Container>
          <div className="fs-2 text-center mt-4">
            Welcome to Local Library, a very basic Express website developed as
            a learning project on the Mozilla Developer Network.
          </div>
        </Container>
        <div className="fs-5 pd-4 mt-3 text-justify">
          <Container>
            <h2>Local Library Catalog</h2>
            <div className="list-unstyled">
              <ul>
                <li>Books: {bookCount}</li>
                <li>Authors: {}</li>
                <li>Copies: {}</li>
                <li>Copies available: {}</li>
                <li>Genres: {}</li>
              </ul>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
