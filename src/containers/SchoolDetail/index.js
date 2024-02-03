import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
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


export default function SchoolDetail() {
  const { uid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchoolInfo(uid)
      .then((res) => {
        if (res) {
          setData({
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
  }, [uid]);

  const handleOnGetStarted = () => {
    window.location.href = "https://transfercompass.com/start/";
  };

  return (
    <Container className="body mb-5">
      {data && (
        <>
          <Row className="mt-4">
            <Col className="p-0">
              <h4>{data.name}</h4>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col
              sm={12}
              md={6}
              className="d-flex justify-content-center justify-content-md-start p-0"
            >
              <Image src={data.pictureUrl} className="image-icon" />
            </Col>
            <Col
              sm={12}
              md={6}
              className="text-center text-md-end mt-4 mt-md-0 p-0"
            >
            <div className="d-flex align-items-center justify-content-center h-100">
              <Card className="p-4 ms-md-5">
                  <h6 className="text-center">Interested in an AI-generated report with personalized transfer application advice?</h6>
                  <Button onClick={handleOnGetStarted} className="px-4 py-2 mt-3">
                    Get Started
                  </Button>
                </Card>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Card>
              <Card.Body>
                <Card.Title className="mb-4">Transfer Details</Card.Title>
                <ListGroup variant="flush">
                  {Object.keys(data.transferDetails).map(
                    (transferDetailKey) => (
                      <ListGroup.Item key={transferDetailKey}>
                        <Row className="d-flex justify-content-between">
                          <Col xs={4}>
                            {camelCaseToSpaceSeparated(transferDetailKey)}
                          </Col>
                          <Col xs={8} className="text-end fw-bold">
                            {data.transferDetails[transferDetailKey]}
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
                  {Object.keys(data.applicationRequirements).map(
                    (appRequirementKey) => (
                      <ListGroup.Item key={appRequirementKey}>
                        <Row className="d-flex justify-content-between">
                          <Col xs={4}>
                            {camelCaseToSpaceSeparated(appRequirementKey)}
                          </Col>
                          <Col xs={8} className="text-end fw-bold">
                            {data.applicationRequirements[appRequirementKey]}
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
      {loading && <Spinner animation="border" />}
    </Container>
  );
}
