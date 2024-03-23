import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import {
  Container,
  Col,
  Row,
  Image,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { fetchSchoolInfo } from "../../utils/api";
import { camelCaseToSpaceSeparated } from "../../utils/helper";
import "./index.css";

export default function CompareSchools() {
  const { query } = useParams();
  let universities = query.split("-&&-");
  let u1 = universities[0];
  let u2 = universities[1];
  const [u1data, setu1Data] = useState(null);
  const [u2data, setu2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchoolInfo(u1)
      .then((res) => {
        if (res) {
          setu1Data({
            ...res,
            pictureUrl: res.image_url,
            transferDetails: res.summary.transfer_details || {},
            applicationRequirements: res.summary.application_requirements || {},
          });
        }
      })
      .catch((ex) => {
        console.log("Error Happening: ", ex.message);
      })
      .finally(() => {
        setLoading(false);
      });

    fetchSchoolInfo(u2)
      .then((res) => {
        if (res) {
          setu2Data({
            ...res,
            pictureUrl: res.image_url,
            transferDetails: res.summary.transfer_details || {},
            applicationRequirements: res.summary.application_requirements || {},
          });
        }
      })
      .catch((ex) => {
        console.log("Error Happening: ", ex.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [u1, u2]);

  const [show, setShow] = useState(false);
  const [universityName, setUniversityName] = useState("");
  const [changingUniversity, setChangingUniversity] = useState("");

  const handleClose = () => {
    setShow(false);
    setChangingUniversity("");
  };
  const handleShow = (universityid) => {
    setShow(true);
    setChangingUniversity(universityid);
  };

  const handleInputChange = (event) => {
    setUniversityName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any action here with the universityName
    let query = "";
    if (changingUniversity === "u1") {
      query = `${u2data.uid}-&&-${universityName}`;
    }
    if (changingUniversity === "u2") {
      query = `${u1data.uid}-&&-${universityName}`;
    }
    navigate("/compare/" + query);
    handleClose();
  };

  return (
    <Container className="body d-flex justify-content-start ">
      <Row>
        <Col>
          {u1data && (
            <>
              <Row className="mt-4">
                <Col className="p-0">
                  <h4>{u1data.name}</h4>
                </Col>
                <Col className="p-0">
                  <Button variant="primary" onClick={() => handleShow("u1")}>
                    Open University Modal
                  </Button>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col
                  sm={12}
                  md={6}
                  className="d-flex justify-content-center justify-content-md-start p-0"
                >
                  <Image src={u1data.pictureUrl} className="image-icon" />
                </Col>
              </Row>
              <Row className="mt-4">
                <Card>
                  <Card.Body>
                    <Card.Title className="mb-4">Transfer Details</Card.Title>
                    <ListGroup variant="flush">
                      {Object.keys(u1data.transferDetails).map(
                        (transferDetailKey) => (
                          <ListGroup.Item key={transferDetailKey}>
                            <Row className="d-flex justify-content-between">
                              <Col xs={4}>
                                {camelCaseToSpaceSeparated(transferDetailKey)}
                              </Col>
                              <Col xs={8} className="text-end fw-bold">
                                {u1data.transferDetails[transferDetailKey]}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Row>

              <Row className="mt-5">
                <Card>
                  <Card.Body>
                    <Card.Title className="mb-4">
                      Application Requirements
                    </Card.Title>
                    <ListGroup variant="flush">
                      {Object.keys(u1data.applicationRequirements).map(
                        (appRequirementKey) => (
                          <ListGroup.Item key={appRequirementKey}>
                            <Row className="d-flex justify-content-between">
                              <Col xs={4}>
                                {camelCaseToSpaceSeparated(appRequirementKey)}
                              </Col>
                              <Col xs={8} className="text-end fw-bold">
                                {
                                  u1data.applicationRequirements[
                                    appRequirementKey
                                  ]
                                }
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Row>
            </>
          )}
        </Col>
        <Col>
          {u2data && (
            <>
              <Row className="mt-4">
                <Col className="p-0">
                  <h4>{u2data.name}</h4>
                </Col>
                <Col className="">
                  <Button variant="primary" onClick={() => handleShow("u2")}>
                    Open University Modal
                  </Button>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col
                  sm={12}
                  md={6}
                  className="d-flex justify-content-center justify-content-md-start p-0"
                >
                  <Image src={u2data.pictureUrl} className="image-icon" />
                </Col>
              </Row>
              <Row className="mt-4">
                <Card>
                  <Card.Body>
                    <Card.Title className="mb-4">Transfer Details</Card.Title>
                    <ListGroup variant="flush">
                      {Object.keys(u2data.transferDetails).map(
                        (transferDetailKey) => (
                          <ListGroup.Item key={transferDetailKey}>
                            <Row className="d-flex justify-content-between">
                              <Col xs={4}>
                                {camelCaseToSpaceSeparated(transferDetailKey)}
                              </Col>
                              <Col xs={8} className="text-end fw-bold">
                                {u2data.transferDetails[transferDetailKey]}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Row>

              <Row className="mt-5">
                <Card>
                  <Card.Body>
                    <Card.Title className="mb-4">
                      Application Requirements
                    </Card.Title>
                    <ListGroup variant="flush">
                      {Object.keys(u2data.applicationRequirements).map(
                        (appRequirementKey) => (
                          <ListGroup.Item key={appRequirementKey}>
                            <Row className="d-flex justify-content-between">
                              <Col xs={4}>
                                {camelCaseToSpaceSeparated(appRequirementKey)}
                              </Col>
                              <Col xs={8} className="text-end fw-bold">
                                {
                                  u2data.applicationRequirements[
                                    appRequirementKey
                                  ]
                                }
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter University Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUniversityName">
                <Form.Label>University Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter university name"
                  value={universityName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
      {loading && <Spinner animation="border" />}
    </Container>
  );
}
