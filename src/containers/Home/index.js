import React, { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import SummaryInfo from "../../components/SummaryInfo";
import { fetchSchoolsList } from "../../utils/api";
import SearchInput from "../../components/SearchBox";

export default function Home() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [queryString, setQueryString] = useState("");
  const pageSize = 10;
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
    <Container>
      <Row className="mt-4">
        <Col md={3} sm={12} className="d-flex align-items-center">
          <p className="h5">Transfer University Profiles</p>
        </Col>
        <Col
          md={{ span: 6, offset: 3 }}
          sm={12}
          className="d-flex align-items-center"
        >
          <SearchInput onInput={handleInput} />
        </Col>
      </Row>
      {schools.map((school) => (
        <Row key={`ui-${school.id}`}>
          <Col>
            <SummaryInfo {...school} />
          </Col>
        </Row>
      ))}
      {loading && <Spinner animation="border" />}
    </Container>
  );
}
