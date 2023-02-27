import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";

function Object() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}

export default Object;
