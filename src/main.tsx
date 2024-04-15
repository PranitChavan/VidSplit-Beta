import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar.tsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import PrivacyPolicy from './pages/Privacy-policy.tsx';
import { ChunksDownload } from './pages/Chunks-download.tsx';
import { Toaster } from '@/components/ui/sonner';

const TOASTER_DURATION = 5000; // Milli-seconds

function Root() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Outlet />
        <Toaster richColors={true} duration={TOASTER_DURATION} className="text-xl" toastOptions={{ className: 'text-xl' }} />
      </ThemeProvider>
    </>
  );
}

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: 'download', element: <ChunksDownload /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
