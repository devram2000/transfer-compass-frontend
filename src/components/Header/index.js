import { Image, Navbar, Nav, Container } from "react-bootstrap";
import "./index.css";

export default function Header() {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="header">
      <Container>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-center align-items-center "
        >
          <Nav className="mx-auto w-75">
            <Nav.Link href="https://transfercompass.com/" className="me-5">
              <div className="d-flex">
                <Image
                  src="https://transfercompass.com/wp-content/uploads/2023/09/Idea-2-e1694436408723.png"
                  height={32}
                />
                <p className="h4 ms-2">Transfer Compass</p>
              </div>
            </Nav.Link>
            <Nav.Link
              href="https://transfercompass.com/"
              className="d-flex align-items-center me-4"
            >
              <p className="h7 subhead">Home</p>
            </Nav.Link>
            <Nav.Link href="/" className="d-flex align-items-center me-4">
              <p className="h7 subhead">School Profiles</p>
            </Nav.Link>

            <Nav.Link
              href="https://transfercompass.com/contact-us/"
              className="d-flex  align-items-center me-4"
            >
              <p className="h7 subhead">Contact Us</p>
            </Nav.Link>
            <div className="ms-lg-auto d-lg-flex justify-content-end">
              <Nav.Link
                href="https://transfercompass.com/contact-us/"
                className="d-flex  align-items-center me-4"
              >
                <p className="h7 subhead link-primary">Login</p>
              </Nav.Link>

              <Nav.Link
                href="https://transfercompass.com/contact-us/"
                className="d-flex align-items-center"
              >
                <p className="h7 subhead ">Sign up</p>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
