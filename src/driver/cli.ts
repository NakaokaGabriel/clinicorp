import "dotenv/config";

import { program } from 'commander';
import fs from 'fs';

import GetTask from '../application/usecases/GetTasks';
import InsertTask from '../application/usecases/InsertTask';
import FirestoreAdapter from '../resources/FirestoreAdapter';
import TaskRepositoryDatabase from '../resources/TaskRepository';
import ShowCliTask from "./cli/ShowTask";
import InsertCliTask from "./cli/InsertTask";

const connection = new FirestoreAdapter();
const taskRepository = new TaskRepositoryDatabase(connection);

const insertTasks = new InsertTask(taskRepository);
const getTasks = new GetTask(taskRepository);

program
  .version('1.0.0')
  .description('Create and Get tasks datas')
  .option('-insert, --insert <value>', 'Insert JSON from file or string')
  .option('-show, --show', 'Insert JSON from file or string')
  .action(async (options) => {
    const showTask = new ShowCliTask(getTasks);
    const insertTask = new InsertCliTask(insertTasks);

    if (options.show) {
      await showTask.execute();
    }
    
    if (options.insert) {
      await insertTask.execute(options);
    } else {
      console.error('Informe um arquivo JSON ou uma string no formato JSON passando o argumento --insert');
      process.exit(1);
    }
  });

program.parse(process.argv);