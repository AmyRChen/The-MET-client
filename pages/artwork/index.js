import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Pagination } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import ArtworkCard from "@/components/ArtworkCard";

function Artwork() {
  const PER_PAGE = 12;
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  //Apply useRouter to get the full value of the query string
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );
  if (error) return <Error statusCode={404} />;

  function previousPage(e) {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function nextPage(e) {
    if (page < data.artworkList.length) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    if (data) {
      let results = [];
      //creating a 2D array of data for paging that we can set in the state as "artworkList"
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
    }
  }, [data]);
  if (artworkList) {
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map(
              (
                art //CHECK
              ) => (
                <Col lg={3} key={art.objectID}>
                  <ArtworkCard objectID={art.objectID} />
                </Col>
              )
            )
          ) : (
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          )}
        </Row>
        <Row>
          {artworkList.length > 0 ? (
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </>
    );
  } else {
    return null;
  }
}

export default Artwork;
