import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  async function getTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    if (res.ok) {
      setTasks(data.data);
    }
  }

    getTasks();
  }, []);

  return (
    <>
      <h1 className="title">Latest Tasks</h1>

      {tasks.length > 0 ? (
        tasks.map((task) => (
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
              <Link
                to={`/tasks/${task.id}`}
                className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Read more
              </Link>
            </div>
            <p>{task.description}</p>
          </div>
        ))
      ) : (
        <p>There are no tasks</p>
      )}
    </>
  );
}