export interface Tasks {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
}
export enum TasksStatus {
  OPEN = 'OPEN',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',
}
