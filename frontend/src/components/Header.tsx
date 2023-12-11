/* eslint-disable react-hooks/exhaustive-deps */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import HeaderUserName from "./HeaderUserName";

const HeaderBar = () => {
  const [openUserOptions, setOpenUserOptions] = useState(false);

  function openUser() {
    setOpenUserOptions(!openUserOptions);
  }

  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="fs-5">
        <Container fluid>
          <Navbar.Brand
            className="ps-5 fs-4"
            href="/"
            style={{ fontWeight: "bold" }}>
            Local Library
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/books">All Books</Nav.Link>
            <Nav.Link href="/authors">All Authors</Nav.Link>
            <Nav.Link href="/bookinstances">All BookInstances</Nav.Link>
            <Nav.Link href="/genres">All Genres</Nav.Link>

            <Nav.Link
              style={{
                position: "relative",
              }}>
              <div>
                <HeaderUserName onClick={openUser} />
              </div>
              {openUserOptions && (
                <div>
                  <Button
                    variant="danger"
                    className="mt-2"
                    style={{
                      position: "absolute",
                      right: "0px",
                    }}
                    onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderBar;
