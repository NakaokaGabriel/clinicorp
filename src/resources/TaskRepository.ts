import os from 'os';

import DatabaseConnection from "./DatabaseConnection";
import { InputTaskDTO, OutputTaskDTO } from '@/DTO/Tasks.dto';
import { query } from 'firebase/firestore';

export type Task = {
  description: string;
  responsable: string;
  status: string;
}

export interface TaskRepository {
  save (input: Task): Promise<any>;
  getAll (): Promise<OutputTaskDTO[]>;
}

export default class TaskRepositoryDatabase implements TaskRepository {
  collectionName: string;

  constructor (readonly connection: DatabaseConnection) {
    this.collectionName = "task";
  }

  async save(input: Task): Promise<Task> {
    try {
      const computer = os.hostname();
      const dbCollection = await this.connection.query("add", this.collectionName, {
        ...input,
        computer
      });
  
      return dbCollection;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getAll(): Promise<OutputTaskDTO[]> {
    const querySnapshot = await this.connection.query('getAll', this.collectionName);
    const result = querySnapshot.docs.map((doc: any) => {
      return doc.data();
    });

    return result;
  }
}

export class TaskRepositoryMemory implements TaskRepository {
  data: Task[]

  constructor () {
    this.data = [];
  }

  async save(input: Task): Promise<Task[]> {
    this.data.push(input);

    return this.data;
  }

  async getAll(): Promise<OutputTaskDTO[]> {
    return this.data;
  }
}
