// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos");

    setTodos(response.data);
  };

  const addTodo = async () => {
    const todo = { description, completed: false };
    const response = await axios.post("http://localhost:3000/todos", todo);
    setTodos([...todos, response.data]);
    setDescription("");
  };

  const updateTodo = async (id, completed) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed };
    await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo(todo.id, e.target.checked)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.description}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
