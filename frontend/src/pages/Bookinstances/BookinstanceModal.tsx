import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const BookinstanceModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h2>
              <Link to={`/book/${props.bookid}`}>{props.book}</Link>
            </h2>
            <div>{props.Imprint}</div>
            <div>{props.status}</div>
            <div>{props.due_back}</div>
            {/* <div>{props.book.author}</div> */}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookinstanceModal;
