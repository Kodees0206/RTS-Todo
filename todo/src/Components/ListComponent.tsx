import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// Define the interface for ToDo items
interface ToDo {
  id: number;
  title: string;
  description: string;
  date: Date;
  status: boolean;
}

function ListComponent() {
  // State variable to store the list of ToDo items
  const [todos, setTodos] = useState<ToDo[]>([]);

  // Function to fetch the list of ToDo items from the server
  async function getToDoList() {
    try {
      const response = await axios.get<ToDo[]>(
        "http://localhost:8080/api/todo"
      );
      setTodos(response.data); // Update the state with the fetched ToDo items
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  }

  // useEffect hook to fetch the ToDo list when the component mounts
  useEffect(() => {
    getToDoList();
  }, []);

  // Function to handle deletion of a ToDo item
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo item?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/todo/${id}`);
        // Remove the deleted todo from the state
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        alert("Todo item deleted successfully.");
      } catch (error) {
        console.error("Error deleting todo:", error);
        alert("Failed to delete todo item. Please try again later.");
      }
    }
  };

  // Render the component
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mt-5">Todo List</h1>
          <div className="table-responsive">
            <Table className="text-center" striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through the list of todos and render each todo as a table row */}
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{new Date(todo.date).toLocaleDateString()}</td>
                    <td>{todo.status ? "Completed" : "Incomplete"}</td>
                    {/* Link to the UpdateComponent with todo id as a URL parameter */}
                    <td>
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/updateTodo/${todo.id}`}
                      >
                        Update
                      </Link>
                    </td>
                    {/* Button to delete the todo item */}
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ListComponent;
