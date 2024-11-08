import React from "react";
  import { Container, Nav, Navbar } from "react-bootstrap";
  import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListComponent from "./Components/ListComponent";
import AddTaskComponent from "./Components/AddTaskComponent";
import UpdateComponent from "./Components/UpdateComponent";

function App() {
  return (
    <>
      {/* Navbar component */}
      <Navbar bg="secondary" data-bs-theme="dark">
        <Container>
          {/* Navbar Brand */}
          <Navbar.Brand className="text-warning text-bold" href="/">
            TODO
          </Navbar.Brand>
          {/* Navbar Links */}
          <Nav className="me-auto">
            <Nav.Link className="text-light" href="/add">
              Add Task
            </Nav.Link>
            <Nav.Link className="text-light" href="/todolist">
              List{" "}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* Main content area */}
      <Container style={{ paddingBottom: "80px" }}>
        <BrowserRouter basename="/">
          <Routes>
            {/* Route for the ListComponent */}
            <Route path="/" element={<ListComponent></ListComponent>}></Route>
            {/* Route for the AddTaskComponent */}
            <Route
              path="/add"
              element={<AddTaskComponent></AddTaskComponent>}
            ></Route>
            {/* Another route for the ListComponent */}
            <Route
              path="/todolist"
              element={<ListComponent></ListComponent>}
            ></Route>
            {/* Route for the UpdateComponent with a dynamic ID */}
            <Route path="/updateTodo/:id" element={<UpdateComponent />} />
          </Routes>
        </BrowserRouter>
      </Container>
      {/* Footer */}
      <footer
        className="footer py-2 bg-dark text-light"
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Container>
          <span style={{ fontSize: "0.8rem" }}>
            © 2024 TODO App. All rights reserved.
          </span>
        </Container>
      </footer>
    </>
  );
}

export default App;
