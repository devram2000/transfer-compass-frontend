import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";

export default function SummaryInfo({
  id,
  name,
  pictureUrl,
  acceptanceRate,
  applicationDeadline,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${id}`);
  };

  return (
    <Card onClick={handleCardClick} className="mt-4">
      <Row>
        <Col
          sm={12}
          md={2}
          className="d-flex justify-content-center align-items-center justify-content-md-start align-items-md-start"
        >
          <Image src={pictureUrl} className="mt-4 mt-md-0" width="100%" />
        </Col>
        <Col sm={12} md={10} className="p-4 d-flex align-items-center">
          <Row className="w-100">
            <Col sm={12} className="mb-4">
              <Link className="h2 text-body card-title" to={`/${id}`}>
                {name}
              </Link>
            </Col>
            <Col sm={6}>
              <p className="h6"><b>{acceptanceRate}</b> Acceptance Rate</p>
            </Col>
            <Col sm={6}>
              <p className="h6"><b>{applicationDeadline}</b> Application Deadline</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
