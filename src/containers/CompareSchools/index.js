import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import {
  Container,
  Image,
  InputGroup,
  ListGroup,
  Table,
  Button,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { fetchSchoolInfo, fetchSchoolsList } from "../../utils/api";
import { camelCaseToSpaceSeparated } from "../../utils/helper";
import "./index.css";

export default function CompareSchools() {
  const navigate = useNavigate();
  const { query } = useParams();
  let universities = query.split("-&&-");
  let u1 = universities[0];
  let u2 = universities[1];

  const [u1data, setu1Data] = useState(null);
  const [u2data, setu2Data] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (u1 === "") {
      navigate(`/compare/${u2}-&&-`);
    }
    u1 !== "" &&
      fetchSchoolInfo(u1)
        .then((res) => {
          if (res) {
            setu1Data({
              ...res,
              pictureUrl: res.image_url,
              transferDetails: res.summary.transfer_details || {},
              applicationRequirements:
                res.summary.application_requirements || {},
            });
          }
        })
        .catch((ex) => {
          console.log("Error Happening: ", ex.message);
        })
        .finally(() => {
          setLoading(false);
        });

    u2 !== "" &&
      u1 !== "" &&
      fetchSchoolInfo(u2)
        .then((res) => {
          if (res) {
            setu2Data({
              ...res,
              pictureUrl: res.image_url,
              transferDetails: res.summary.transfer_details || {},
              applicationRequirements:
                res.summary.application_requirements || {},
            });
          }
        })
        .catch((ex) => {
          console.log("Error Happening: ", ex.message);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [u1, u2, navigate]);
  // show model
  const [show, setShow] = useState(false);
  // query search the university name
  const [u1Search, setU1Search] = useState("");
  const [u2Search, setU2Search] = useState("");
  // the changing university u1(left side university) or u2(right side university)
  const [changingUniversity, setChangingUniversity] = useState("");
  //Filtered universities from query
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  const handleModalClose = () => {
    setShow(false);
    setChangingUniversity("");
  };

  const handleModalShow = (e, universityid) => {
    e.preventDefault();
    var searchquery = "";
    if (universityid === "u1") {
      searchquery = u1Search;
    } else {
      searchquery = u2Search;
    }
    fetchSchoolsList(searchquery, 1, 30)
      .then((res) => {
        setFilteredUniversities(res.universities);
      })
      .then(() => {
        setShow(true);
        setChangingUniversity(universityid);
      });
  };

  const handleu1InputChange = (event) => {
    setU1Search(event.target.value);
  };
  const handleu2InputChange = (event) => {
    setU2Search(event.target.value);
  };
  const handleSubmit = (event, uid) => {
    event.preventDefault();
    setU1Search("");
    setU2Search("");
    let query = "";
    if (changingUniversity === "u1") {
      u2data ? (query = `${uid}-&&-${u2data.uid}`) : (query = `${uid}-&&-`);
    }
    if (changingUniversity === "u2") {
      u1data ? (query = `${u1data.uid}-&&-${uid}`) : (query = `${uid}-&&-`);
    }
    handleModalClose();
    navigate("/compare/" + query);
  };

  return (
    <Container className="w-75 mt-5">
      <>
        <h1 className="text-center fs-2 fw-bolder mt-2 mb-5 pb-4">
          Compare Universities
        </h1>
        <Table stripped responsive>
          <tbody>
            <tr>
              <td className="border border-0">
                <p></p>
              </td>
              <td className="border border-0">
                <p>Swap university</p>
                <Form onSubmit={(e) => handleModalShow(e, "u1")}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter university name"
                      value={u1Search}
                      onChange={handleu1InputChange}
                    />
                    <Button variant="primary" size="sm" type="submit">
                      Swap
                    </Button>
                  </InputGroup>
                </Form>
              </td>
              <td className="border border-0">
                <p>Swap university</p>
                <Form onSubmit={(e) => handleModalShow(e, "u2")}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter university name"
                      value={u2Search}
                      onChange={handleu2InputChange}
                    />
                    <Button variant="primary" size="sm" type="submit">
                      Swap
                    </Button>
                  </InputGroup>
                </Form>
              </td>
            </tr>
            <tr>
              {(u1data || u2data) && (
                <td className="align-bottom ">
                  <b className="fs-3 ">Transfer Details</b>
                </td>
              )}
              {u1data && (
                <>
                  <td className="border">
                    <Image src={u1data.pictureUrl} className="image-icon" />
                    <p className="fs-4 fw-bold">{u1data.name}</p>
                    <p>
                      Acceptance Rate -{" "}
                      <span className="fw-semibold">
                        {u1data.summary.acceptance_rate}
                      </span>
                    </p>
                    <p>
                      Application Deadline -{" "}
                      <span className="fw-semibold">
                        {
                          u1data.summary.transfer_details
                            .upcoming_transfer_deadline
                        }
                      </span>
                    </p>
                  </td>
                </>
              )}
              {u2data && (
                <>
                  <td className="border">
                    <Image src={u2data.pictureUrl} className="image-icon" />
                    <p className="fs-4 fw-bold">{u2data.name}</p>
                    <p>
                      Acceptance Rate -{" "}
                      <span className="fw-semibold">
                        {u2data.summary.acceptance_rate}
                      </span>
                    </p>
                    <p>
                      Application Deadline -{" "}
                      <span className="fw-semibold">
                        {
                          u2data.summary.transfer_details
                            .upcoming_transfer_deadline
                        }
                      </span>
                    </p>
                  </td>
                </>
              )}
            </tr>

            {u1data &&
              Object.keys(u1data.transferDetails).map((transferDetailKey) => (
                <tr key={transferDetailKey}>
                  <td>{camelCaseToSpaceSeparated(transferDetailKey)}</td>
                  <td className="fw-semibold border">
                    {u1data.transferDetails[transferDetailKey] || "-"}
                  </td>
                  {u2data && (
                    <td className="fw-semibold border">
                      {u2data.transferDetails[transferDetailKey] || "-"}
                    </td>
                  )}
                </tr>
              ))}
            {u1data && (
              <tr>
                <td className="align-bottom">
                  <b className="fs-3 ">Application Details</b>
                </td>
                <td className="border">
                  <p></p>
                </td>
                {u2data && (
                  <td className="border">
                    <p></p>
                  </td>
                )}
              </tr>
            )}
            {u1data &&
              Object.keys(u1data.applicationRequirements).map(
                (appRequirementKey) => (
                  <tr key={appRequirementKey}>
                    <td>{camelCaseToSpaceSeparated(appRequirementKey)}</td>
                    <td className="fw-semibold border">
                      {u1data.applicationRequirements[appRequirementKey] || "-"}
                    </td>
                    {u2data && (
                      <td className="fw-semibold text-wrap border">
                        {u2data.applicationRequirements[appRequirementKey] ||
                          "-"}
                      </td>
                    )}
                  </tr>
                )
              )}
            <tr>
              <td className="border-0"></td>
              {u1data && (
                <td className="border">
                  <Button className="w-100">Chance me</Button>
                </td>
              )}
              {u2data && (
                <td className="border">
                  <Button className="w-100">Chance me</Button>
                </td>
              )}
            </tr>
          </tbody>
        </Table>

        <Modal show={show} scrollable={true} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select university</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {filteredUniversities.length >= 1 ? (
                filteredUniversities.map((item) => {
                  return (
                    <ListGroup.Item
                      className="pointer"
                      onClick={(e) => handleSubmit(e, item.uid)}
                    >
                      <span>
                        <Image
                          src={item.image_url}
                          className="image-small"
                        ></Image>
                      </span>
                      <span>{item.name}</span>
                    </ListGroup.Item>
                  );
                })
              ) : (
                <p>Oops!! No universities found</p>
              )}
            </ListGroup>
          </Modal.Body>
        </Modal>
      </>

      {loading && <Spinner animation="border" />}
    </Container>
  );
}
