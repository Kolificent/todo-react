export interface Task {
  id: string;
  label: string;
  isDone: boolean;
}

export type TaskAction =
  | { type: 'toggled'; id: string }
  | { type: 'edited'; id: string; label: string }
  | { type: 'deleted'; id: string }
  | { type: 'added'; label: string };
