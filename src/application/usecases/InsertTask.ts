import { InputTaskDTO, OutputTaskDTO } from "@/DTO/Tasks.dto";
import { TaskRepository } from "@/resources/TaskRepository";

export default class InsertTask {
  constructor (readonly taskRepository: TaskRepository) {}

  async execute(inputs: InputTaskDTO[]): Promise<OutputTaskDTO[]> {
    let data = [] as OutputTaskDTO[];
    
    for (const input of inputs) {
      const result = await this.taskRepository.save(input);
      
      data.push({
        id: result.id,
        computer: "teste",
        description: input.description,
        responsable: input.responsable,
        status: input.status
      });
    }

    return data;
  }
}
