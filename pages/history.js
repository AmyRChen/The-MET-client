import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import styles from "@/styles/History.module.css";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`); //${searchHistory[index]}
  }

  function removeHistoryClicked(e, index) {
    // stop the event from trigging other events
    e.stopPropagation();
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }

  return parsedHistory.length === 0 ? (
    <Card>
      <Card.Body>
        <Card.Title>Nothing Here</Card.Title>
        <Card.Text>Try searching for some artwork.</Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <ListGroup>
      {parsedHistory?.map((historyItem, index) => (
        <ListGroup.Item
          className={styles.historyListItem}
          onClick={(e) => historyClicked(e, index)}
        >
          {Object.keys(historyItem).map((key) => (
            <>
              {key}: <strong>{historyItem[key]}</strong>&nbsp;
            </>
          ))}
          <Button
            className="float-end"
            variant="danger"
            size="sm"
            onClick={(e) => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
