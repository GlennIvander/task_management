import { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import CreateTaskModal from "./CreateTaskModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import API from "../../api/axios";

export default function TaskList({ tasks = [], setTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  fetchTasks();
}, []);
  
  const openEditModal = (task) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };

const handleCreate = async (taskData) => {
  try {
    const res = await API.post("/tasks", taskData);
    setTasks(prev => [res.data.data, ...prev]);
    setOpenCreate(false);
  } catch (err) {
    console.error(err);
  }
};


const handleUpdate = async (updatedTask) => {
  const res = await API.put(`/tasks/${updatedTask.id}`, updatedTask);
  setTasks(tasks.map(t => (t.id === updatedTask.id ? res.data.data : t)));
  setOpenEdit(false);
};


  // open modal
const openDeleteModal = (task) => {
  setSelectedTask(task);
  setOpenDelete(true);
};

// delete function
const handleDelete = async (id) => {
  await API.delete(`/tasks/${id}`);
  setTasks(tasks.filter(t => t.id !== id));
  setOpenDelete(false);
};


  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.length > 0 ? tasks.map((task) => (
          <li
            key={task.id}
            className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <p className="font-medium">{task.title}</p>
              <small className="text-gray-500 capitalize">{task.status}</small>
            </div>

            <button
              onClick={() => openEditModal(task)}
              className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
            >
              Edit
            </button>
          </li>
        )) : (
          <p className="text-gray-500 text-center">No tasks yet</p>
        )}
      </ul>

      {/* Modals */}
      <EditTaskModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        task={selectedTask}
        onUpdate={handleUpdate}
      />

      <CreateTaskModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onSave={handleCreate}
      />

      <button
  onClick={() => openDeleteModal(task)}
  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
>
  Delete
</button>

<DeleteConfirmModal
  isOpen={openDelete}
  onClose={() => setOpenDelete(false)}
  onConfirm={handleDelete}
  task={selectedTask}
/>



    </div>

    
  );
}
