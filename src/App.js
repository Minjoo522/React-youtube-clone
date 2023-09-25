import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
