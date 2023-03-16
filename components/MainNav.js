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

function MainNav() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("searchVal");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function handleSubmit(e, searchVal) {
    //add the computed queryString value to the searchHistory.
    let queryString = `title=true&q=${searchVal}`;
    setSearchHistory((current) => [...current, queryString]);

    e.preventDefault();
    //console.log(searchVal); //Comment latter
    setIsExpanded(false);
    e.target.reset();
    router.push(`/artwork?title=true&q=${searchVal}`);
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
          <Navbar.Brand>PingJu Chen</Navbar.Brand>
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
            </Nav>
            &nbsp
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
            &nbsp
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
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
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
