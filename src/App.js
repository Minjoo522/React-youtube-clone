import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/videos', element: <Videos /> },
      { path: '/videos/watch/:videoId', element: <VideoDetail /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
