import GetTask from "../../application/usecases/GetTasks";

export default class ShowCliTask {
  constructor (
    readonly getTask: GetTask
  ) {}

  async execute() {
    try {
      const tasks = await this.getTask.execute();

      const mountConsole = tasks.map(task => ({
        id: task.id,
        'Tarefa': task.description,
        'Responsável': task.responsable,
        Status: task.status,
        Computador: task.computer
      }));

      console.table(mountConsole);
    } catch (error: any) {
      console.error(`Erro em: ${error.message}`);
      process.exit(1);
    }
  }
}