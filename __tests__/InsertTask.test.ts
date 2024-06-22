import "dotenv/config";

import InsertTask from "../src/application/usecases/InsertTask";
import FirestoreAdapter from "../src/resources/FirestoreAdapter";
import TaskRepositoryDatabase from "../src/resources/TaskRepository";

describe("Insert tasks", () => {

  it("should create a new task", async () => {
    const connection = new FirestoreAdapter();
    const taskRepository = new TaskRepositoryDatabase(connection);
    const insertTask = new InsertTask(taskRepository);

    const inputInsertTask = [
      {
        description: "Criar Login",
        responsable: "bruno",
        status: "done",
        computer: "macbook",
      },
    ];

    const outputTask = await insertTask.execute(inputInsertTask);

    expect(outputTask).toEqual([
      {
        description: "Criar Login",
        responsable: "bruno",
        status: "done",
      },
    ]);
  });

  it("should create tasks based in an array input", async () => {
    const connection = new FirestoreAdapter();
    const taskRepository = new TaskRepositoryDatabase(connection);
    const insertTask = new InsertTask(taskRepository);

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

    const outputTask = await insertTask.execute(inputInsertTask);

    expect(outputTask[0].id).toBeDefined();
  });

  it("shouldn't create a new task if description is invalid", async () => {
    const connection = new FirestoreAdapter();
    const taskRepository = new TaskRepositoryDatabase(connection);
    const insertTask = new InsertTask(taskRepository);

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

    const outputTask = await insertTask.execute(inputInsertTask);
  })
});
