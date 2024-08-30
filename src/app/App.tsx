import Box from '@mui/material/Box';
import { Container, CssBaseline } from '@mui/material';
import Logo from '../components/ui/Logo';
import AddTaskForm from '../components/AddTaskForm';
import TodoLists from '../components/TodoLists/TodoLists';
import { TasksProvider } from './TaskProvider';
import { Fragment } from 'react/jsx-runtime';

function App() {
  // ? норм ли так стиль выносить
  const mainBoxStyle = {
    width: '100%',
    height: '100%',
    my: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    p: 2,
    fontSize: '0.8rem',
    border: '1px solid grey',
    borderRadius: '10px',
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Box sx={mainBoxStyle}>
          <Logo />
          <TasksProvider>
            <AddTaskForm />
            <TodoLists />
          </TasksProvider>
        </Box>
      </Container>
    </Fragment>
  );
}

export default App;
