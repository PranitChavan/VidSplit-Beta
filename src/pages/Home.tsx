import Navbar from '../components/navbar';
import Main from '../components/main';
import { ThemeProvider } from '../components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import VideoPreview from '@/components/video-preview';
import Container from '@/components/container';
import { useVideoStorageState } from '@/stores/video';

const TOASTER_DURATION = 5000; // Milli-seconds

function Home() {
  const chunkUrls = useVideoStorageState((state) => state.chunkUrls);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        {chunkUrls.length <= 0 && <Main />}

        <Container>{chunkUrls.length > 0 && <VideoPreview />}</Container>
        <Toaster richColors={true} duration={TOASTER_DURATION} className="text-xl" toastOptions={{ className: 'text-xl' }} />
      </ThemeProvider>
    </>
  );
}

export default Home;
