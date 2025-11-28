import React, { useState } from "react";
import CreateTaskModal from "../components/CreateTaskModal";

export default function TaskList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn Laravel", status: "pending", due_date: "2025-12-01" },
    { id: 2, title: "Build Task App", status: "in_progress", due_date: "2025-12-05" },
    { id: 3, title: "Deploy App", status: "done", due_date: "2025-12-10" },
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Tasks</h2>

          <button
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
            onClick={() => setShowCreateModal(true)}
          >
            + New Task
          </button>
          {showCreateModal && (
  <CreateTaskModal
    onClose={() => setShowCreateModal(false)}
    onSave={handleAddTask}
  />
)}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search task..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Status */}
          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-left border">
          <thead className=" bg-gray-200">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td className="p-2 border">{task.title}</td>
                  <td className="p-2 border capitalize">{task.status.replace('_', ' ')}</td>
                  <td className="p-2 border">{task.due_date}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button className="text-blue-600 font-semibold hover:underline">
                      Edit
                    </button>
                    <button className="text-red-600 font-semibold hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button className="px-3 py-1 border rounded">Prev</button>
          <span className="px-3 py-1">{page}</span>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>

      </div>
    </div>
    
  );
}
