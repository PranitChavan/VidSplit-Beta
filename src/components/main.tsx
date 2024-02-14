import VideoUpload from '@/components/video-upload';
import Container from './container';
import VideoStatusTable from './video-status-table';
import { useVideoStore } from '@/stores/video';

export default function Main() {
  const videoFile = useVideoStore((state) => state.videoFile);
  const videoDuration = useVideoStore((state) => state.videoDuration);

  return (
    <>
      <header>
        <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight text-center sm:p-3 px-5 pt-7">Free video splitter for stories</h2>
        <p className="text-xl text-muted-foreground text-center p-3">Split lengthy videos into into stories! Best for Instagram, Whatsapp, Facebook, Snapchat & more. No watermark!</p>
      </header>
      <main>
        <Container>
          <VideoUpload />
          {videoFile && <VideoStatusTable videoDuration={videoDuration} videoFile={videoFile} />}
        </Container>
      </main>
    </>
  );
}
