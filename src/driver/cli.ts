import "dotenv/config";

import { program } from 'commander';
import fs from 'fs';

import GetTask from '../application/usecases/GetTasks';
import InsertTask from '../application/usecases/InsertTask';
import FirestoreAdapter from '../resources/FirestoreAdapter';
import TaskRepositoryDatabase from '../resources/TaskRepository';

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
    if (options.show) {
      try {
        const tasks = await getTasks.execute();
        const responseTags = tasks.map(task => ({
          id: task.id,
          'Tarefa': task.description,
          'Responsável': task.responsable,
          Status: task.status,
          Computador: task.computer
        }));

        console.table(responseTags);
      } catch (parseErr:any) {
        console.error(`Erro: ${parseErr.message}`);
        process.exit(1);
      }
    }

    if (options.insert) {
      const value = options.insert;

      // Check if the value is a path to an existing file
      fs.stat(value, async (err, stats) => {
        if (err) {
          // If error is "no such file or directory", assume it's a JSON string
          if (err.code === 'ENOENT') {
            try {
              const jsonData = JSON.parse(value);
              console.log(JSON.stringify(jsonData, null, 2));
              await insertTasks.execute(jsonData);
              process.exit(1);
            } catch (parseErr:any) {
              console.error(`Error parsing JSON from string: ${parseErr.message}`);
              process.exit(1);
            }
          } else {
            console.error(`Error accessing file: ${err.message}`);
            process.exit(1);
          }
        } else {
          // If file exists, read and parse it
          if (stats.isFile()) {
            fs.readFile(value, 'utf8', async (readErr, data) => {
              if (readErr) {
                console.error(`Error reading file: ${readErr.message}`);
                process.exit(1);
              }
              try {
                const jsonData = JSON.parse(data);
                console.log(JSON.stringify(jsonData, null, 2));
                await insertTasks.execute(jsonData);
                process.exit(1);
              } catch (parseErr: any) {
                console.error(`Error parsing JSON from file: ${parseErr.message}`);
                process.exit(1);
              }
            });
          } else {
            console.error('Provided path is not a file.');
            process.exit(1);
          }
        }
      });
    } else {
      console.error('Please provide a JSON file or a JSON string with -i or --insert.');
      process.exit(1);
    }
  });

program.parse(process.argv);