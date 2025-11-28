import { useState } from "react";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import React from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return loggedIn ? (
    <TaskList />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}
