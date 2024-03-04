import { getUploadedVideoUrl } from '@/utils/video';

export async function uploadVideoFileToStorage(video: File | undefined, sessionId: string): Promise<string> {
  if (!video) throw new Error('video file not found');

  const supabaseModule = await import('@/supabase/supabase');
  const { storage } = supabaseModule.default;

  const { data, error } = await storage.from(import.meta.env.VITE_STORAGE_BUCKET_ID).upload(`${sessionId}/${video.name}`, video, {
    upsert: true,
  });

  if (error) throw new Error('Failed to upload');

  return getUploadedVideoUrl(data.path, storage);
}
