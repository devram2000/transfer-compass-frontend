import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();

  useEffect(() => {
    fetchSchoolInfo(uid)
      .then((res) => {
        if (res) {
          setData({
            ...res,
            acceptanceRate: res.summary.acceptance_rate || {},
            applicationDeadline:
              res.summary.transfer_details.upcoming_transfer_deadline || {},
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

  const handleCompareRedirect = () => {
    navigate(`/compare/${uid}-&&-`);
  };

  return (
    <Container className="body mb-5">
      {data && (
        <>
          <Container className="w-75 mt-5">
            <h1 className="text-center fs-2 fw-bolder mt-2 mb-5 pb-4">
              {data.name}
            </h1>
            <Row className="mb-5 d-flex g-3">
              <Col lg={8} sm={12} className="">
                <Row className="d-flex justify-content-center align-items-center border ">
                  <Col lg={4} sm={12} className="d-flex justify-content-center">
                    <Image src={data.pictureUrl} className="image-icon"></Image>
                  </Col>
                  <Col>
                    <p className="fs-4 fw-bold mt-4 mb-0">{data.name}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed sed arcu tincidunt, dignissim libero a, varius tortor.
                      Integer vel lorem tellus. Morbi fermentum vulputate
                      lacinia. Mauris non odio augue. Nam lobortis
                      <br></br>
                      Acceptance Rate - <b>{data.acceptanceRate}</b> |
                      Application Deadline - <b>{data.applicationDeadline}</b>
                    </p>
                  </Col>
                </Row>
                <Row className="border">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="fs-4 fw-bold">
                      Transfer Details
                    </ListGroup.Item>
                    {Object.keys(data.transferDetails).map(
                      (transferDetailKey) => (
                        <ListGroup.Item key={transferDetailKey}>
                          <Row className="d-flex justify-content-between">
                            <Col xs={5}>
                              {camelCaseToSpaceSeparated(transferDetailKey)}
                            </Col>
                            <Col className="text-start fw-semibold">
                              {data.transferDetails[transferDetailKey]}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    )}
                  </ListGroup>
                  <ListGroup variant="flush" className="border-top">
                    <ListGroup.Item className="fs-4 fw-bold">
                      Application Requirements
                    </ListGroup.Item>
                    {Object.keys(data.applicationRequirements).map(
                      (appRequirementKey) => (
                        <ListGroup.Item key={appRequirementKey}>
                          <Row className="d-flex justify-content-between">
                            <Col xs={5}>
                              {camelCaseToSpaceSeparated(appRequirementKey)}
                            </Col>
                            <Col className="text-start fw-semibold">
                              {data.applicationRequirements[
                                appRequirementKey
                              ] || "-"}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    )}
                    <ListGroup.Item>
                      <Row>
                        <Col className="d-flex flex-row-reverse">
                          <Button onClick={handleCompareRedirect}>
                            Compare School
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </Col>
              <Col className="">
                <Card>
                  <Card.Img variant="top" src={data.pictureUrl} />
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button size="sm" variant="primary">
                      Go somewhere
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
      {loading && <Spinner animation="border" />}
    </Container>
  );
}
