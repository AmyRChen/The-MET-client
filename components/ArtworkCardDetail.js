import useSWR from "swr";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

function ArtworkCardDetail(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(props.objectID));
  }, [favouritesList, props.objectID]);

  async function favouritesClicked(e) {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(props.objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(props.objectID));
      setShowAdded(true);
    }
  }

  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null
  );
  if (error) return <Error statusCode={404} />;
  if (data) {
    return (
      <Card>
        {data.primaryImage && (
          <Card.Img variant="top" src={data.primaryImage} />
        )}
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
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
            <br />
            <strong>Artist: </strong>
            {data.artistDisplayName ? (
              <>
                {data.artistDisplayName}{" "}
                {data.artistWikidata_URL && (
                  <span>
                    (
                    <a
                      href={data.artistWikidata_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      wiki
                    </a>
                    )
                  </span>
                )}
              </>
            ) : (
              "N/A"
            )}
            <br />
            <strong>Credit Line: </strong>
            {data.creditLine ? <>{data.creditLine}</> : "N/A"}
            <br />
            <strong>Dimensions: </strong>
            {data.dimensions ? <>{data.dimensions}</> : "N/A"}
          </Card.Text>
          <br />
          <Button
            variant={showAdded ? "dark" : "outline-dark"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}

export default ArtworkCardDetail;
