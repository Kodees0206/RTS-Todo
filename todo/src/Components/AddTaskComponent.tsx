import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddTaskComponent() {
  // Define state variables for the form fields
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoStatus, setTodoStatus] = useState("");

  // Initialize navigate function
  const navigate = useNavigate();

  // Define an interface for ToDo items
  interface ToDo {
    id: number;
    title: string;
    description: string;
    date: Date;
    status: boolean;
  }

  // Get the current date in ISO format
  const currentDate = new Date().toISOString().split("T")[0];

  // Function to add a new ToDo item
  const addToDo = async () => {
    const newItem: ToDo = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      title: todoTitle,
      description: todoDescription,
      date: new Date(todoDate),
      status: todoStatus === "completed", // Set status based on selection
    };

    // Make a POST request to add the new ToDo item
    try {
      await axios.post("http://localhost:8080/api/todo", newItem);
      console.log(newItem);
      alert("New task added successfully!");
      navigate("/todolist"); // Redirect to the ToDo list page
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  // Render the component
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Form className="mt-5 p-4 text-dark">
            {/* Title input field */}
            <Form.Group controlId="formTitle">
              <Form.Label className="text-dark">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
            </Form.Group>
            {/* Description input field */}
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
              />
            </Form.Group>
            {/* Date input field */}
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={todoDate}
                min={currentDate} // Set minimum date to current date
                onChange={(e) => setTodoDate(e.target.value)}
              />
            </Form.Group>
            {/* Status select field */}
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={todoStatus}
                onChange={(e) => setTodoStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
              </Form.Control>
            </Form.Group>
            {/* Button to add a new task */}
            <Button className="mt-3" variant="primary" onClick={addToDo}>
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTaskComponent;
