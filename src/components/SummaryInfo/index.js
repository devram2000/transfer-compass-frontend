import Card from "react-bootstrap/Card";
import "./index.css";

export default function SummaryInfo({
  uid,
  name,
  image_url: pictureUrl,
  summary: {
    acceptance_rate: acceptanceRate,
    transfer_details: { upcoming_transfer_deadline: applicationDeadline },
  },
}) {
  return (
    <Card className="h-100 mt-4">
      <Card.Img variant="top" src={pictureUrl} className="image-icon" />
      <Card.Body>
        <Card.Title className="fw-bold">{name}</Card.Title>
        <Card.Text>
          <p>
            Acceptance Rate - <span className="fw-bold">{acceptanceRate}</span>
          </p>
          <p>
            Application Deadline -{" "}
            <span className="fw-bold">{applicationDeadline}</span>
          </p>
        </Card.Text>
        <Card.Link
          href={`/${uid}`}
          className="link-underline link-underline-opacity-0 pointer"
        >
          View Profile
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
