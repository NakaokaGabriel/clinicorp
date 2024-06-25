import { Request, Response } from 'express';

import TaskRepositoryDatabase from "../../resources/TaskRepository";
import FirestoreAdapter from "../../resources/FirestoreAdapter";

import InsertTask from '../../application/usecases/InsertTask';
import GetTask from '../../application/usecases/GetTasks';

const connection = new FirestoreAdapter();
const taskRepository = new TaskRepositoryDatabase(connection);

const insertTasks = new InsertTask(taskRepository);
const getTasks = new GetTask(taskRepository);

export async function insertTask (req: Request, res: Response) {
  const output = await insertTasks.execute(req.body);

  return res.status(200).json(output);
}

export async function getTask (_: Request, res: Response) {
  const output = await getTasks.execute();

  return res.status(200).json(output);
}