import Navbar from '../components/navbar';
import Main from '../components/main';
import { ThemeProvider } from '../components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
// import VideoPreview from '@/components/video-preview';
// import Container from '@/components/container';

const TOASTER_DURATION = 5000; // Milli-seconds

function Home() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Main />

        {/* <Container>
          <VideoPreview />
        </Container> */}
        <Toaster richColors={true} duration={TOASTER_DURATION} className="text-xl" toastOptions={{ className: 'text-xl' }} />
      </ThemeProvider>
    </>
  );
}

export default Home;
