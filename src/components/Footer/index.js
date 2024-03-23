import { Container, Row, Col, Image } from "react-bootstrap";
import "./index.css";

export default function Footer() {
  return (
    <>
      <Container fluid className="footer">
        <Row className="footerp1 p-5">
          <Col lg={2}></Col>
          <Col lg={3}>
            <div className="d-flex ">
              <Image
                src="https://transfercompass.com/wp-content/uploads/2023/09/Idea-2-e1694436408723.png"
                height={32}
                className="my-auto"
              />
              <p className="h4 ms-2 mt-2">Transfer Compass</p>
            </div>

            <p className="mt-2">
              Our mission is to make your dream school transefr a reality
              without the hassles and financial burdens we faced.
            </p>
          </Col>
          <Col lg={6} md={12} sm={12} className="d-flex align-items-center">
            <ul className="fs-6 d-flex flex-column p-0">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact us</li>
            </ul>
          </Col>
        </Row>

        <Row className="footerp2 p-2">
          <Col lg={4} sm={12} className="">
            <p className="my-auto text-lg-end text-md-start">
              Transfer Compass &#169; 2023
            </p>
          </Col>
          <Col lg={4}></Col>
          <Col lg={2} sm={12} className="my-auto text-lg-end text-">
            <a href="./" className="link-underline link-underline-opacity-0">
              Privacy policy
            </a>
          </Col>
          <Col lg={2} className=" my-auto">
            <a href="./" className="link-underline link-underline-opacity-0">
              Terms & Conditions
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}
