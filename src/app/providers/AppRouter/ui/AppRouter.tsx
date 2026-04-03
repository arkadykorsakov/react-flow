import { RouterProvider } from 'react-router';
import { router } from '../config/router';

export function AppRouter() {
  return <RouterProvider router={router} />;
}
