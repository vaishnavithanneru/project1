import { useState } from "react";
import { useRouter } from "next/router";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status, dueDate }),
    });
    router.push("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input required placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2" />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Create</button>
      </form>
    </div>
  );
}
