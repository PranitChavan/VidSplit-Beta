import { getUploadedVideoUrl } from '@/utils/utils';

export async function uploadVideoFileToStorage(video: File | undefined): Promise<string> {
  if (!video) throw new Error('video file not found');

  const supabaseModule = await import('@/supabase/supabase');
  const { storage } = supabaseModule.default;

  const { data, error } = await storage.from('Videos').upload(`Original/${video.name}`, video, {
    upsert: true,
  });

  if (error) throw new Error('Failed to upload');

  return getUploadedVideoUrl(data.path, storage);
}
