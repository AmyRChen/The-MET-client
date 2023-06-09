import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //warning message
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function handleSubmit(e) {
    if (userName === null && password === null) {
      setUserName("test-user");
      setPassword("test");
    }
    
    e.preventDefault();
    try {
      await authenticateUser(userName, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
  }

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <>
      <br />
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>

      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            id="userName"
            name="userName"
          />
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
        </Form.Group>
        <br />

        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
        <br />
        <div className="mb-2">
          <Button variant="secondary" className="pull-right" type="submit">
            Login
          </Button>
          <br />
          <Button
            variant="secondary"
            className="my-2"
            type="submit"
            onClick={(e) => {
              handleSubmit;
            }}
          >
            Guest User Login
          </Button>
        </div>
      </Form>
    </>
  );
}
