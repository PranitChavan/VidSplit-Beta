import VideoPreview from '@/components/video-preview';
import Container from '@/components/container';
import { useVideoStorageState } from '@/stores/video';

export function ChunksDownload() {
  const chunkUrls = useVideoStorageState((state) => state.chunkUrls);

  return (
    <>
      <Container>{chunkUrls.length > 0 && <VideoPreview />}</Container>
    </>
  );
}
