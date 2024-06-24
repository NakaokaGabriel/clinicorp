import "dotenv/config";
import express from 'express';

import TaskRepositoryDatabase from "../resources/TaskRepository";
import FirestoreAdapter from "../resources/FirestoreAdapter";

import InsertTask from '../application/usecases/InsertTask';
import GetTask from "../application/usecases/GetTasks";

const app = express();

const connection = new FirestoreAdapter();
const taskRepository = new TaskRepositoryDatabase(connection);

const insertTasks = new InsertTask(taskRepository);
const getTasks = new GetTask(taskRepository);

app.use(express.json());

app.post("/insert-tasks", async (req, res) => {
  const output = await insertTasks.execute(req.body);

  return res.status(200).json(output);
});

app.get("/get-tasks", async (req, res) => {
  const output = await getTasks.execute();

  return res.status(200).json(output);
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});