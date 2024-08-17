import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    if (!newTodo) return;
    axios
      .post("http://localhost:5001/todos", { text: newTodo })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5001/todos/${id}`)
      .then((response) => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add To-Do</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
