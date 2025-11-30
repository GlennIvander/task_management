import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getTasks() {
      const res = await fetch(`/api/tasks/${id}`);
      const data = await res.json();
      if (res.ok) {
        if (data.task.user.id !== user.id) {
        navigate("/");
        }
        setFormData({
          title: data.task.title,
          description: data.task.description,
          status: data.task.status,
          due_date: data.task.due_date,
        });
      }
    }
  
      getTasks();
    }, [id]);
  

  async function handleUpdate(e) {
    e.preventDefault();

     const res = await fetch(`/api/tasks/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();


    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }
  return (
    <>
      <h1 className="title">Update your post</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Post Task"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          >
          </textarea>
            {errors.description && <p className="error">{errors.description[0]}</p>}
        </div>

        <div>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            value={formData.due_date}
            onChange={(e) =>
              setFormData({ ...formData, due_date: e.target.value })
            }
          />
          {errors.due_date && <p className="error">{errors.due_date[0]}</p>}
        </div>

        <button className="primary-btn">Update</button>
      </form>
    </>
  );
}