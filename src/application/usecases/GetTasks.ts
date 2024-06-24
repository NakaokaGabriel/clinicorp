import { TaskRepository } from "@/resources/TaskRepository";

export default class GetTask {
  constructor(
    readonly taskRepository: TaskRepository
  ) {}

  async execute() {
    const task = await this.taskRepository.getAll();

    return task;
  }
}