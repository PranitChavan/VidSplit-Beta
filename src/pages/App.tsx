import Navbar from '../components/navbar';
import Main from '../components/main';
import { ThemeProvider } from '../components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const TOASTER_DURATION = 5000; // Milli-seconds

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Main />
        <Toaster richColors={true} duration={TOASTER_DURATION} className="text-xl" toastOptions={{ className: 'text-xl' }} />
      </ThemeProvider>
    </>
  );
}

export default App;
