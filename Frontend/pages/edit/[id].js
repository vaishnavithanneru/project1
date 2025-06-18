import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditTask() {
  const { id } = useRouter().query;
  const [task, setTask] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTask(data.find(t => t.id === id)));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    router.push("/");
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} className="border p-2" />
        <textarea value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} className="border p-2" />
        <select value={task.status} onChange={e => setTask({ ...task, status: e.target.value })} className="border p-2">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="date" value={task.dueDate?.split("T")[0]} onChange={e => setTask({ ...task, dueDate: e.target.value })} className="border p-2" />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" type="submit">Update</button>
      </form>
    </div>
  );
}
