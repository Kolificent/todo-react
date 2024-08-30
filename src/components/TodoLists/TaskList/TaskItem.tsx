import {
  Box,
  Checkbox,
  IconButton,
  Input,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasksDispatch } from '../../../app/TaskProvider';
import { ChangeEvent, FormEvent, useState } from 'react';

interface TaskItemProps {
  id: string;
  label: string;
  type: 'todo' | 'done';
}

function TaskItem({ id, label, type }: TaskItemProps) {
  const dispatch = useTasksDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isOnHover, setIsOnHover] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  function handleCheckboxChange() {
    dispatch({
      type: 'toggled',
      id: id,
    });
  }

  function handleEditButton() {
    setIsEditing(!isEditing);
    dispatch({
      type: 'edited',
      id: id,
      label: newLabel,
    });
  }

  function handleLabelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({
      type: 'edited',
      id: id,
      label: newLabel,
    });
    setIsEditing(false);
  }

  function handleLabelChange(e: ChangeEvent<HTMLInputElement>) {
    setNewLabel(e.target.value);
  }

  function handleDeleteButton() {
    dispatch({
      type: 'deleted',
      id: id,
    });
  }

  return (
    <ListItem
      onMouseEnter={() => setIsOnHover(true)}
      onMouseLeave={() => setIsOnHover(false)}
      key={id}
      disablePadding
      sx={{ px: 2 }}
    >
      <ListItemIcon>
        <Checkbox
          onChange={handleCheckboxChange}
          edge="start"
          tabIndex={-1}
          disableRipple
          checked={type === 'done'}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </ListItemIcon>
      {!isEditing ? (
        <ListItemText primary={label} />
      ) : (
        <Box
          sx={{ width: '100%' }}
          component="form"
          onSubmit={handleLabelSubmit}
        >
          <Input
            autoFocus
            fullWidth
            onChange={handleLabelChange}
            defaultValue={label}
          />
        </Box>
      )}
      {(isOnHover || isEditing) && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {type === 'todo' && (
            <IconButton onClick={handleEditButton} edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            onClick={handleDeleteButton}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </ListItem>
  );
}

export default TaskItem;
