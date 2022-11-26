import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import './App.css';
import Layout from './pages/Layout';
import Error from './pages/Error';
import Home from './pages/Home';
import About from './pages/About';
import Editor from './pages/Editor';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/editor',
          element: <Editor />,
        },
      ],
    },
  ],
  {
    // Need to be deployed on GitHub Pages
    basename: process.env.PUBLIC_URL || '/',
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
