import { Box, List, Typography } from '@mui/material';
import TaskItem from './TaskItem';
import { useTasks } from '../../../app/TaskProvider';
import { Fragment } from 'react/jsx-runtime';

interface TaskListProps {
  type: 'todo' | 'done';
}

function TaskList({ type }: TaskListProps) {
  const isDone = type === 'done';

  const items = useTasks().filter((task) => task.isDone === isDone);

  const taskListStyle = {
    my: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  return (
    <Fragment>
      {!!items.length && (
        <Box sx={taskListStyle}>
          <Typography variant="caption">
            {type === 'todo' ? 'В ПЛАНЕ' : 'ГОТОВО'}
            {` (${items.length})`}
          </Typography>
          <List
            sx={{
              width: '100%',
            }}
          >
            {items.map((item) => (
              <TaskItem type={type} {...item} />
            ))}
          </List>
        </Box>
      )}
    </Fragment>
  );
}

export default TaskList;
