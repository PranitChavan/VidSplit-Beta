import Navbar from '../components/navbar';
import Main from '../components/main';
import { ThemeProvider } from '../components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Main />
        <Toaster richColors={true} duration={10000000000} className="text-xl" toastOptions={{ className: 'text-xl' }} />
      </ThemeProvider>
    </>
  );
}

export default App;
