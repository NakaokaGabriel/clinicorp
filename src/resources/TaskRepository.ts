import os from 'os';

import DatabaseConnection from "./DatabaseConnection";

export type Task = {
  description: string;
  responsable: string;
  status: string;
}

export interface TaskRepository {
  save (input: Task): Promise<any>;
  getAll (): Promise<Task>;
}

export default class TaskRepositoryDatabase implements TaskRepository {
  collectionName: string;

  constructor (readonly connection: DatabaseConnection) {
    this.collectionName = "task";
  }

  async save(input: Task): Promise<any> {
    const computer = os.hostname();
    const dbCollection = await this.connection.query("add", this.collectionName, {
      ...input,
      computer
    });

    return dbCollection;
  }

  async getAll(): Promise<Task> {
    const querySnapshot = await this.connection.query('getAll', this.collectionName);
    const result = querySnapshot.docs.map((doc: any) => {
      return doc.data();
    });

    return result;
  }
}
