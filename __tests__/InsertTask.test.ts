import "dotenv/config";

import InsertTask from "../src/application/usecases/InsertTask";
import FirestoreAdapter from "../src/resources/FirestoreAdapter";
import TaskRepositoryDatabase, { TaskRepositoryMemory } from "../src/resources/TaskRepository";
import FirestoreConnection from "@/resources/DatabaseConnection";

describe("Insert tasks", () => {
  let connection: FirestoreConnection;
  let taskRepository: TaskRepositoryMemory | TaskRepositoryDatabase;
  let insertTask: InsertTask;

  beforeAll(() => {
    connection = new FirestoreAdapter();
    taskRepository = new TaskRepositoryMemory();
    insertTask = new InsertTask(taskRepository);
  });

  afterAll(() => {
    connection.disconnect();
  });

  it("should create tasks based in an array input", async () => {
    taskRepository = new TaskRepositoryDatabase(connection);
    insertTask = new InsertTask(taskRepository);

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

  it("shouldn't create a new task if field `description` is empty", async () => {
    const inputInsertTask = [
      {
        description: "",
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

    await expect(() => insertTask.execute(inputInsertTask)).rejects.toThrow(new Error("Description is empty."));
  });

  it("shouldn't create a new task if field `responsable` is empty", async () => {
    const inputInsertTask = [
      {
        description: "Criar Login",
        responsable: "",
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

    await expect(() => insertTask.execute(inputInsertTask)).rejects.toThrow(new Error("Responsable is empty."));
  });

  it("shouldn't create a new task if field `status` is empty", async () => {
    const inputInsertTask = [
      {
        description: "Criar Login",
        responsable: "bruno",
        status: "",
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

    await expect(() => insertTask.execute(inputInsertTask)).rejects.toThrow(new Error("Status is empty."));
  });
});
