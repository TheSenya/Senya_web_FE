import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/root_layout/RootLayout';
import Register from '../components/auth/Register';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      // {
      //   path: '/about',
      //   element: <About />,
      // },
    ],
  },
]);

export default router;