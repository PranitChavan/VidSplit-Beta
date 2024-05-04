import VideoProcess from './video-process';
import Container from './container';
import VideoStatusTable from './video-status-table';
import AddVideoUrl from './add-video-url';
import { useState } from 'react';

export default function Main() {
  const [videoDuration, setVideoDuration] = useState<number | undefined>();
  const [video, setVideo] = useState<File | string | undefined>();

  return (
    <>
      <header>
        <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight text-center sm:p-3 px-5 pt-7">Free video splitter for stories</h2>
        <p className="text-xl text-muted-foreground text-center p-3">Cut lengthy videos into into stories! Best for Instagram, Whatsapp, Facebook, Snapchat & more. No watermark!</p>
      </header>
      <main>
        <Container>
          {<VideoProcess setVideoDuration={setVideoDuration} videoDuration={videoDuration} setVideo={setVideo} video={video} />}
          {video && videoDuration && <VideoStatusTable videoDuration={videoDuration} video={video} />}
          {!video && <AddVideoUrl setVideo={setVideo} setVideoDuration={setVideoDuration} />}
        </Container>
      </main>
    </>
  );
}
