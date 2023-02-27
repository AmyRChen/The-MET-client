import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function MainNav() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("searchVal");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchVal);
    router.push(`/artwork?title=true&q=${searchVal}`);
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand>PingJu Chen</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button
                variant="outline-success"
                type="submit"
                onClick={handleSubmit}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      debug:{searchVal}
    </>
  );
}

export default MainNav;
