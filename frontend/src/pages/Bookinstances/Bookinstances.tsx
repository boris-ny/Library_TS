import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { fetchBookinstancesDetails } from "./BookinstancesService";
import HeaderBar from "../../components/Header";
import { Link } from "react-router-dom";
import BookinstanceModal from "./BookinstanceModal";
import BookinstanceCreateModal from "./BookinstanceCreateModal";
import { useMutation } from "@tanstack/react-query";
import { createBookCopy } from "../../util/api";
import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";



function Bookinstances() {
  const [bookinstances, setBookinstances] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showdetails, setShowDetails] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleCloseDetails = () => setShowDetails(false);

  const handleCloseCreate = () => setShowCreate(false);

  const mutation = useMutation({
    mutationFn: createBookCopy,
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: `You have successfully created a new book copy!`,
        background: "#242424",
        icon: "success",
        timer: 10000,
      });

      
    },
    onError: (error) => { 
      Swal.fire({
        title: "Error!",
        text: `${error} Something went wrong!`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  });
  
  const handleSubmit = (data:any) => {
    mutation.mutate(data);
    mutation.reset();
    
  }

  useEffect(() => {(data: any) => createBookCopy(data);
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
      <HeaderBar />
      <Container>
        <div className="mt-5 d-flex justify-content-between">
          <h1>Book Instances</h1>
          <Button
            variant="primary"
            className="mb-3"
            onClick={(e) => {
              e.preventDefault();
              setShowCreate(true);
            }}>
            Create a new copy of a book
          </Button>
          <BookinstanceCreateModal
            show={showCreate}
            handleCloseCreate={handleCloseCreate}
            onSubmit={handleSubmit}
          />
        </div>
        {/* <ol>
          {bookinstances.length > 0 ? (
            bookinstances.map((bookinstance: any) => (
              <li key={bookinstance.id}>
                <Link
                  to={`/book/${bookinstance.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDetails(true);
                  }}>
                  {bookinstance.Book.title}: {bookinstance.imprint}
                </Link>
                <BookinstanceModal
                  show={showdetails}
                  handleClose={handleCloseDetails}
                  title={bookinstance.id}
                  Imprint={bookinstance.imprint}
                  status={bookinstance.status}
                  due_back={bookinstance.due_back}
                  book={bookinstance.Book.title}
                  bookid={bookinstance.Book.id}
                />
                {bookinstance.status === "Available" && (
                  <span className="text-success ms-2">
                    {bookinstance.status}
                  </span>
                )}
                {bookinstance.status === "Loaned" && (
                  <span className="text-danger ms-2">
                    {bookinstance.status}
                  </span>
                )}
                {bookinstance.status === "Reserved" && (
                  <span className="text-warning ms-2">
                    {bookinstance.status}
                  </span>
                )}
                {bookinstance.status !== "Available" && (
                  <span className="ms-2">(Due: {bookinstance.due_back})</span>
                )}
              </li>
            ))
          ) : (
            <li>There are no book copies in this library</li>
          )}
        </ol> */}
        <Row className=" px-auto mx-auto">
          {bookinstances.map((bookinstance: any) => (
            <Col key={bookinstance.id} lg="3" className="mt-4">
              <Card style={{ width: "100%" }}>
                <Card.Header className="fs-3 text-center ">
                  {bookinstance.Book.title}
                </Card.Header>
                <Card.Body>
                  <Card.Title>ID:{bookinstance.Book.id}</Card.Title>
                  <Card.Text
                    style={{
                      height: "50px",
                    }}>
                    <div className="fs-4">
                      <span className="my-2">Status: </span>
                      {bookinstance.status === "Available" ? (
                        <Badge bg="success">{bookinstance.status}</Badge>
                      ) : bookinstance.status === "Loaned" ? (
                        <Badge bg="danger">{bookinstance.status}</Badge>
                      ) : bookinstance.status === "Reserved" ? (
                        <Badge bg="warning">{bookinstance.status}</Badge>
                      ) : (
                        "Null"
                      )}
                    </div>
                    <div>
                      {bookinstance.status !== "Available" && (
                        <span>Due: {bookinstance.due_back}</span>
                      )}
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="">
                  <Button variant="danger">Delete</Button>

                  <Button
                    variant="info"
                    className="ms-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDetails(true);
                    }}>
                    Update
                  </Button>
                  <BookinstanceModal
                    show={showdetails}
                    handleClose={handleCloseDetails}
                    title={bookinstance.id}
                    Imprint={bookinstance.imprint}
                    status={bookinstance.status}
                    due_back={bookinstance.due_back}
                    book={bookinstance.Book.title}
                    bookid={bookinstance.Book.id}
                  />
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Bookinstances;
