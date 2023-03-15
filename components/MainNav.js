import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function MainNav() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("searchVal");
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(searchVal); //Comment latter
    e.target.reset();
    setIsExpanded(false); //CHECK
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
              setIsExpanded((prevState) => (prevState = !prevState)); //CHECK
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={(e) => {
                    setIsExpanded(false);
                  }}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  onClick={(e) => {
                    setIsExpanded(false);
                  }}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp
            <Form className="d-flex" onSubmit={handleSubmit}>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
