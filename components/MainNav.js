import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";

function MainNav() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();

  async function handleSubmit(e, searchVal) {
    e.preventDefault();
    //console.log(searchVal); //Comment latter
    setIsExpanded(false);

    //add the computed queryString value to the searchHistory.
    setSearchHistory(await addToHistory(`title=true&q=${searchVal}`));

    router.push(`/artwork?title=true&q=${searchVal}`);
    e.target.reset();
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push(`/login`);
  }

  return (
    <>
      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        className="fixed-top"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>The MET Collection</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={(e) => {
              setIsExpanded((prevState) => (prevState = !prevState));
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={(e) => {
                    setIsExpanded(false);
                  }}
                >
                  Home
                </Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form
                className="d-flex"
                onSubmit={(e) => handleSubmit(e, searchVal)}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                />
                <Button variant="success" type="submit">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={(e) => {
                        setIsExpanded(false);
                      }}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={(e) => {
                        setIsExpanded(false);
                      }}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
