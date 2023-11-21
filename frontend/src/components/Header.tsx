import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const HeaderBar: React.FC = () => {
  

  return (
    // <header className="header">
    //   <div className="logo">
    //     <Link to="/">LOCAL LIBRARY</Link>
    //   </div>
    //   <ul>
    //     <li>
    //       <Link to="/login">
    //         <FaSignInAlt /> Login
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/register">
    //         <FaUser /> Register
    //       </Link>
    //     </li>
    //   </ul>
    // </header>

    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="fs-5">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>
            Local Library
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/books">All Books</Nav.Link>
            <Nav.Link href="/authors">All Authors</Nav.Link>
            <Nav.Link href="/bookinstances">All BookInstances</Nav.Link>
            <Nav.Link href="/genres">All Genres</Nav.Link>
            <div className="d-flex justify-content-evenly">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
  }  


export default HeaderBar;
