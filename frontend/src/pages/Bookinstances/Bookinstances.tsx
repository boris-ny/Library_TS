import { useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { fetchBookinstancesDetails } from "./BookinstancesService";
import HeaderBar from "../../components/Header";

import BookinstanceCreateModal from "./BookinstanceCreateModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateBookinstance,
  createBookCopy,
  deleteBookinstance,
} from "../../util/api";
import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";

import { BOOK_INSTANCES } from "../../util/queryconstants";
import BookinstanceUpdateModal from "./BookinstanceUpdateModal";
import { Guard } from "../../components/Guard.component";
import { PermissionLevel } from "../../types/common";

function Bookinstances() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [currentBookinstance, setCurrentBookinstance] = useState<any>();

  const handleCloseUpdate = () => setShowUpdate(false);

  const handleCloseCreate = () => setShowCreate(false);

  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: createBookCopy,
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: `You have successfully created a new book copy!`,
        background: "#242424",
        icon: "success",
        timer: 10000,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: [BOOK_INSTANCES],
      });
      setShowCreate(false);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: `${error} Something went wrong!`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateBookinstance,
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: `You have successfully Updated ur book copy!`,
        background: "#242424",
        icon: "success",
        timer: 10000,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: [BOOK_INSTANCES],
      });
      setShowUpdate(false);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: `${error} Something went wrong!`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteBookinstance,
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: `You have successfully Deleted ur book copy!`,
        background: "#242424",
        icon: "success",
        timer: 10000,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: [BOOK_INSTANCES],
      });
      setShowUpdate(false);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: `${error} Something went wrong!`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  const handleSubmitCreate = (data: any) => {
    mutationCreate.mutate(data);
    mutationCreate.reset();
  };

  const handleSubmitUpdate = (data: any) => {
    mutationUpdate.mutate({ ...data, id: currentBookinstance.id });
    mutationUpdate.reset();
  };

  const handleSubmitDelete = (data: any) => {
    mutationDelete.mutate({ id: data.id });
    mutationDelete.reset();
  };

  const {
    data: bookinstances,
    error,
    isLoading,
  } = useQuery({
    queryKey: [BOOK_INSTANCES],
    queryFn: fetchBookinstancesDetails,
  });

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  if (isLoading) {
    return <div>The Page is Loading ...</div>;
  }

  return (
    <>
      <HeaderBar />
      <Container
        style={{
          minHeight: "100vh",
        }}>
        <div className="mt-5 d-flex justify-content-between">
          <h1>Book Instances</h1>
          <Guard requiredRoles={[PermissionLevel.ADMIN]}>
            <Button
              variant="primary"
              className="mb-3"
              onClick={(e) => {
                e.preventDefault();
                setShowCreate(true);
              }}>
              Create a new copy of a book
            </Button>
          </Guard>
          <BookinstanceCreateModal
            show={showCreate}
            handleCloseCreate={handleCloseCreate}
            onSubmit={handleSubmitCreate}
          />
        </div>

        <Row className=" px-auto mx-auto">
          {bookinstances?.data?.map((bookinstance: any) => (
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
                <Guard requiredRoles={[PermissionLevel.ADMIN]}>
                  <Card.Footer>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmitDelete(bookinstance);
                      }}>
                      Delete
                    </Button>

                    <Button
                      variant="info"
                      className="ms-3"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowUpdate(true);
                        setCurrentBookinstance(bookinstance);
                      }}>
                      Update
                    </Button>
                    {currentBookinstance && (
                      <BookinstanceUpdateModal
                        show={showUpdate}
                        handleCloseUpdate={handleCloseUpdate}
                        onSubmit={handleSubmitUpdate}
                        bookinstance={currentBookinstance}
                      />
                    )}
                  </Card.Footer>
                </Guard>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Bookinstances;
