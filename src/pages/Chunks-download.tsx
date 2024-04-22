import VideoPreview from '@/components/video-preview';
import Container from '@/components/container';
import { useVideoStorageState } from '@/stores/video';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChunksDownload() {
  const chunkUrls = useVideoStorageState((state) => state.chunkUrls);
  const navigate = useNavigate();

  useEffect(() => {
    if (chunkUrls.length === 0) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Container>{chunkUrls.length > 0 && <VideoPreview />}</Container>
    </>
  );
}
