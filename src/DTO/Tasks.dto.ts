export enum Status {
  "todo",
  "done",
  "doing"
}

export type InputTaskDTO = {
  description: string;
  responsable: string;
  status: string;
}

export type OutputTaskDTO = {
  id: string;
  description: string;
  responsable: string;
  status: string;
  computer: string;
}