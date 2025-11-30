import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../Context/AppContext";

export default function Show () {
  const { id } = useParams();
  const { token, user } = useContext(AppContext);
  const [task, setTasks] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
  async function getTasks() {
    const res = await fetch(`/api/tasks/${id}`);
    const data = await res.json();
    if (res.ok) {
      setTasks(data.task);
    }
  }

    getTasks();
  }, []);

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id === task.user.id) {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      }
      console.log(data);
    }
  }
  
  return (
  <>
    {task ? (
        
          <div
            key={task.id}
            className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-2xl">{task.title}</h2>
                <small className="text-xs text-slate-600">
                  Created by {task.user.name} on{" "}
                  {new Date(task.created_at).toLocaleTimeString()}
                </small>
              </div>

            </div>
            <p>{task.description}</p>

            {user && user.id === task.user.id && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/tasks/update/${task.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Update
              </Link>

              <form onSubmit={handleDelete}>
                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                  Delete
                </button>
              </form>
            </div>
          )}
          </div>
        
      ) : (
        <p>Task not found!</p>
      )}
  </>
  )
}