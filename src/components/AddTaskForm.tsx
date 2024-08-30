import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTasksDispatch } from '../app/TaskProvider';
import { ChangeEvent, FormEvent, useState } from 'react';

function AddTaskForm() {
  const dispatch = useTasksDispatch();
  const [taskLabel, setTaskLabel] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({
      type: 'added',
      label: taskLabel,
    });
    setTaskLabel('');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTaskLabel(e.target.value);
  }

  return (
    <Box onSubmit={handleSubmit} component="form" sx={{ width: '100%' }}>
      <TextField
        value={taskLabel}
        onChange={handleChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled={!taskLabel.trim()} type="submit">
                <AddCircleIcon cursor="pointer" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Введите задачу"
        variant="filled"
        size="small"
      />
    </Box>
  );
}

export default AddTaskForm;
