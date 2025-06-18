import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <button
        onClick={() => router.push("/add")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Task
      </button>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border p-4 mb-2 rounded shadow">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>Status: {task.status}</p>
            {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
            <div className="mt-2 flex gap-2">
              <button onClick={() => router.push(`/edit/${task.id}`)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
