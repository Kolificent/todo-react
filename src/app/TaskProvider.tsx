import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { Task, TaskAction } from '../contracts';
import { v4 as uuid } from 'uuid';

const initialTaskData: Task[] = [
  { id: '1', label: 'Первая задача', isDone: false },
  { id: '2', label: 'Вторая задача', isDone: true },
  { id: '3', label: 'Третья задача', isDone: false },
];

const tasksContext = createContext<Array<Task> | null>(null);
const tasksDispatchContext = createContext<Dispatch<TaskAction> | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTaskData);

  return (
    <tasksContext.Provider value={tasks}>
      <tasksDispatchContext.Provider value={dispatch}>
        {children}
      </tasksDispatchContext.Provider>
    </tasksContext.Provider>
  );
}

export function useTasks() {
  const tasks = useContext(tasksContext);

  if (!tasks) {
    throw new Error('tasks is null');
  }
  return tasks;
}

export function useTasksDispatch() {
  const tasksDispatch = useContext(tasksDispatchContext);

  if (!tasksDispatch) {
    throw new Error('tasksDispatch is null');
  }
  return tasksDispatch;
}

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'toggled':
      let taskItem = tasks.find((task) => task.id === action.id);
      if (!taskItem) {
        return tasks;
      }
      taskItem = { ...taskItem, isDone: !taskItem.isDone };
      const filteredTasks = tasks.filter((task) => task.id !== action.id);
      return taskItem.isDone
        ? [taskItem, ...filteredTasks]
        : [...filteredTasks, taskItem];

    case 'edited':
      return tasks.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            label: action.label,
          };
        } else {
          return task;
        }
      });
    case 'added':
      return [
        ...tasks,
        {
          id: uuid(),
          label: action.label,
          isDone: false,
        },
      ];
    case 'deleted':
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
}
