import "dotenv/config";

import InsertTask from "../src/application/usecases/InsertTask";
import GetTask from "@/application/usecases/GetTasks";

import FirestoreAdapter from "../src/resources/FirestoreAdapter";
import TaskRepositoryDatabase, { TaskRepositoryMemory } from "../src/resources/TaskRepository";
import FirestoreConnection from "@/resources/DatabaseConnection";

describe("Get tasks", () => {
  let connection: FirestoreConnection;
  let taskRepository: TaskRepositoryMemory | TaskRepositoryDatabase;
  let insertTask: InsertTask;
  let getTask: GetTask;

  beforeAll(() => {
    connection = new FirestoreAdapter();
    taskRepository = new TaskRepositoryMemory();
    insertTask = new InsertTask(taskRepository);
    getTask = new GetTask(taskRepository);
  });

  afterAll(() => {
    connection.disconnect();
  });

  it("should show all tasks and order by asc", async () => {
    const inputInsertTask = [
      {
        description: "Criar Login",
        responsable: "bruno",
        status: "done",
      },
      {
        description: "Criar Menu",
        responsable: "bruno",
        status: "doing",
      },
      {
        description: "Criar tela de perfil",
        responsable: "bruno",
        status: "todo",
      },
    ];

    await insertTask.execute(inputInsertTask);
    
    const outputTask = await getTask.execute();

    expect(outputTask).toEqual(inputInsertTask);
  });
});
