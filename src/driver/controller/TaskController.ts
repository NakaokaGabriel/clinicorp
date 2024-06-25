import HttpServer from '../../application/contracts/HttpServer';
import GetTask from '../../application/usecases/GetTasks';
import InsertTask from '../../application/usecases/InsertTask';
import { InputTaskDTO } from '../../DTO/Tasks.dto';

export default class TaskController {
  constructor (
    readonly httpServer: HttpServer,
    readonly insertTask: InsertTask,
    readonly getTask: GetTask
  ) {
    this.httpServer.route('post', '/insert-tasks', async (body: InputTaskDTO[], _: void) => {
      const output = await this.insertTask.execute(body);

      return output;
    });

    this.httpServer.route('get', '/get-tasks', async (body: InputTaskDTO[], _: void) => {
      const output = await this.getTask.execute();

      return output;
    });
  }
}