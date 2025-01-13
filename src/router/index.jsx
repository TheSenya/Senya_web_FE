import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/root_layout/RootLayout';
import Register from '../components/auth/Register';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Gym from '../pages/gym/Gym';
import TaskManager from '../pages/task_manager/taskManager';
import Notes from '../pages/notes/Notes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/gym',
        element: <Gym />,
      },
      {
        path: '/taskmanager',
        element: <TaskManager />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
    ],
  },  
]);

export default router;