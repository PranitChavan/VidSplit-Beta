import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getVideoDuration } from '@/utils/video';

export default function AddVideoUrl() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  async function handleUrlSubmit() {
    try {
      if (!videoUrl) return;
      const duration = await getVideoDuration(videoUrl);
      console.log(duration);
    } catch {
      alert('Invalid url');
    }
  }

  return (
    <>
      <section className="flex flex-col gap-2 px-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mt-10 mb-2"> Or enter a video URL</h3>
        <Input placeholder="https://example.com/video.mp4" type="url" onChange={(e) => setVideoUrl(e.target.value)} />
        <Button className="mt-4" onClick={handleUrlSubmit} disabled={!Boolean(videoUrl)}>
          Submit URL
        </Button>
      </section>
    </>
  );
}
