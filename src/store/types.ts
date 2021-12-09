export type Task = { id: number; description: string; completed: boolean };

export enum Filter {
  All,
  Completed,
  Pending,
}
