import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
