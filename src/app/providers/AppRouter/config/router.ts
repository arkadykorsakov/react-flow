import { createBrowserRouter } from 'react-router';
import { AppLayout } from 'app/layouts/AppLayout';
import HomePage from 'pages/HomePage';
import TestPage from 'pages/TestPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'test', Component: TestPage },
    ],
  },
]);
