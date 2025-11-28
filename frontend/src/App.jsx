import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import TaskList from "./pages/tasks/TaskList";
import TaskCreate from "./pages/tasks/CreateTaskModal";
import TaskEdit from "./pages/tasks/EditTaskModal";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/create" element={<TaskCreate />} />
        <Route path="tasks/:id/edit" element={<TaskEdit />} />
      </Route>
    </Routes>
  );
}
