import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Pagination } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";

function Artwork() {
  const PER_PAGE = 12;
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);
  //Apply useRouter to get the full value of the query string
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data) {
      let results = [];
      //creating a 2D array of data for paging that we can set in the state as "artworkList"
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  function previousPage(e) {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function nextPage(e) {
    if (page < artworkList.length) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  if (error) return <Error statusCode={404} />;
  else if (!artworkList) return null;
  else if (artworkList.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Nothing Here</Card.Title>
          <Card.Text>Try searching for something else.</Card.Text>
        </Card.Body>
      </Card>
    );
  } else if (artworkList.length > 0) {
    return (
      <>
        <Row className="gy-4">
          {artworkList[page - 1]?.map((objID) => (
            <Col lg={3} key={objID}>
              <ArtworkCard objectID={objID} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <br />
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      </>
    );
  }
}

export default Artwork;
