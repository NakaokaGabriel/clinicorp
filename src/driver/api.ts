import "dotenv/config";

import ExpressAdapter from "./http/ExpressAdapter";
import FirestoreAdapter from "../resources/FirestoreAdapter";
import TaskRepositoryDatabase from "../resources/TaskRepository";

import InsertTask from "../application/usecases/InsertTask";
import GetTask from "../application/usecases/GetTasks";

import TaskController from "./controller/TaskController";

const httpServer = new ExpressAdapter();

const connection = new FirestoreAdapter();
const taskRepository = new TaskRepositoryDatabase(connection);

const insertTask = new InsertTask(taskRepository);
const getTask = new GetTask(taskRepository);

new TaskController(httpServer, insertTask, getTask);

httpServer.listen(process.env.PORT ?? 3000);
