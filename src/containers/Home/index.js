import React, { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import SummaryInfo from "../../components/SummaryInfo";
import { fetchSchoolsList } from "../../utils/api";
import SearchInput from "../../components/SearchBox";
import Form from "react-bootstrap/Form";

export default function Home() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [queryString, setQueryString] = useState("");
  const pageSize = 30;
  const isMounted = useRef(false);

  const scrollListener = (e) => {
    if (
      window.scrollY + window.innerHeight + 2 >= document.body.scrollHeight &&
      schools.length < total
    ) {
      setPageNum(pageNum + 1);
    }
  };

  const handleInput = (inputValue) => {
    if (queryString !== inputValue) {
      setQueryString(inputValue);
      setSchools([]);
      setPageNum(1);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    window.addEventListener("scroll", scrollListener);
    return () => {
      isMounted.current = false;
      window.removeEventListener("scroll", scrollListener);
    };
  });

  useEffect(() => {
    isMounted.current && setLoading(true);
    fetchSchoolsList(queryString, pageNum, pageSize)
      .then((response) => {
        const { universities, total, page } = response;
        setSchools([...schools, ...universities]);
        setTotal(total);
        setPageNum(page);
      })
      .catch((ex) => {
        console.log("Error Happening: ", ex.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, queryString]);

  return (
    <Container className="w-75 mb-5">
      <h1 className="text-center fs-2 fw-bolder m-4">
        Transfer University Profiles
      </h1>
      <Row className="mt-5 g-3">
        <Col md={4} sm={12} className="">
          <SearchInput onInput={handleInput} />
        </Col>
        <Col className="d-md-flex justify-content-end">
          <Row>
            <Col className="d-flex">
              <Form.Select size="sm" name="sortby" id="sortby">
                <option value="recommended">Recommended</option>
                <option value="op1">Saab</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select size="sm" name="filterby" id="filterby">
                <option value="location">Location</option>
                <option value="op1">Saab</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row lg={3} md={2} xs={1} className="gy-3">
        {schools.map((school) => (
          <Col>
            <SummaryInfo {...school} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center align-items-center pt-5">
        {loading && <Spinner animation="border" className="wx-auto" />}
      </div>
    </Container>
  );
}
