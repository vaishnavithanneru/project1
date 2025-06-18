import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());



AppDataSource.initialize().then(() => {
  const taskRepo = AppDataSource.getRepository(Task);

  // GET /tasks
  app.get("/tasks", async (_req, res) => {
    const tasks = await taskRepo.find();
    res.json(tasks);
  });

  // POST /tasks
  app.post("/tasks", async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    if (!title || !status) {
      return res.status(400).json({ error: "Title and status are required" });
    }

    const task = taskRepo.create({ title, description, status, dueDate });
    const result = await taskRepo.save(task);
    res.status(201).json(result);
  });

  // PUT /tasks/:id
  app.put("/tasks/:id", async (req, res) => {
    const task = await taskRepo.findOneBy({ id: req.params.id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const { title, description, status, dueDate } = req.body;
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    const result = await taskRepo.save(task);
    res.json(result);
  });

  // DELETE /tasks/:id
  app.delete("/tasks/:id", async (req, res) => {
    const result = await taskRepo.delete({ id: req.params.id });
    if (result.affected === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send();
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB", err);
});
