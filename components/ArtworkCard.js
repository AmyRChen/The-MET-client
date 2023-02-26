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
    <Card style={{ width: "18rem" }}>
      {data.primaryImageSmall ? (
        <Card.Img variant="top" src={data.primaryImageSmall} />
      ) : (
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        />
      )}
      <Card.Body>
        {data.title ? <Card.Title>{data.title}</Card.Title> : "N/A"}
        <Card.Text>
          <strong>Date: </strong>
          {data.objectDate ? <>{data.objectDate}</> : "N/A"}
          <strong>Classification: </strong>
          {data.classification ? <>{data.classification}</> : "N/A"}
          <strong>Medium: </strong>
          {data.medium ? <>{data.medium}</> : "N/A"}
        </Card.Text>
        <Link href={`/artwork/${data.objectID}`} passHref>
          <Button variant="primary">
            <strong>ID: </strong>
            {data.objectID}
          </Button>
        </Link>
      </Card.Body>
    </Card>;
  } else {
    return null;
  }
}

export default ArtworkCard;
