import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar.tsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import { Toaster } from '@/components/ui/sonner';

const ChunksDownloadPage = React.lazy(() => import('@/pages/Chunks-download.tsx'));
const PrivacyPolicyPage = React.lazy(() => import('@/pages/Privacy-policy.tsx'));
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

function wrapComponentInSuspense(Component: React.LazyExoticComponent<() => JSX.Element>) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-dvh">
          <h1>Loading...</h1>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/privacy-policy', element: wrapComponentInSuspense(PrivacyPolicyPage) },
      { path: 'download', element: wrapComponentInSuspense(ChunksDownloadPage) },
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
