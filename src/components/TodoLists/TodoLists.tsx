import { Box, Divider } from '@mui/material';
import TaskList from './TaskList/TaskList';
import { useTasks } from '../../app/TaskProvider';

function TodoLists() {
  const tasks = useTasks();
  const tasksDone = tasks.filter((task) => task.isDone);

  const isTasksMonotonous =
    tasksDone.length * (tasks.length - tasksDone.length) !== 0;

  return (
    <Box sx={{ width: '100%', gap: 3 }}>
      <TaskList type="todo" />
      {isTasksMonotonous && <Divider orientation="horizontal" flexItem />}
      <TaskList type="done" />
    </Box>
  );
}

export default TodoLists;
