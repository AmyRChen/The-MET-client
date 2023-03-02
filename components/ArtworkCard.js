import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );
  if (error) return <Error statusCode={404} />;
  if (data) {
    return (
      <Card>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall
              ? data.primaryImageSmall
              : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          {data.title ? <Card.Title>{data.title}</Card.Title> : "N/A"}
          <Card.Text>
            <strong>Date: </strong>
            {data.objectDate ? <>{data.objectDate}</> : "N/A"}
            <br />
            <strong>Classification: </strong>
            {data.classification ? <>{data.classification}</> : "N/A"}
            <br />
            <strong>Medium: </strong>
            {data.medium ? <>{data.medium}</> : "N/A"}
            <br />
          </Card.Text>
          <Link href={`/artwork/${props.objectID}`} passHref>
            <Button variant="outline-secondary">
              <strong>ID: </strong>
              {data.objectID}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}

export default ArtworkCard;
