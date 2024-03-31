import { getUploadedVideoUrl } from '@/utils/video';
import { SplitRequestParms } from '@/types/types';
import { StorageClient } from '@supabase/storage-js';

let supabaseStorageClient: StorageClient;

export async function uploadVideoFileToStorage(video: File | undefined, sessionId: string): Promise<string> {
  if (!video) throw new Error('video file not found');

  const supabaseModule = await import('@/supabase/supabase');
  const { storage } = supabaseModule.default;
  supabaseStorageClient = storage;

  const { data, error } = await storage.from(import.meta.env.VITE_STORAGE_BUCKET_ID).upload(`${sessionId}/${video.name}`, video, {
    upsert: true,
  });

  if (error) throw new Error('Failed to upload');

  return getUploadedVideoUrl(data.path, storage);
}

export async function splitVideo(videoParams: SplitRequestParms) {
  const { videoUrl, chunkDuration, sessionId } = videoParams;

  try {
    const payload: SplitRequestParms = {
      videoUrl: videoUrl,
      chunkDuration: chunkDuration,
      sessionId: sessionId!,
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    const response: Response = await fetch(import.meta.env.VITE_SPLIT_VIDEO_API_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to split!');
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export async function getVideoChunksUrlFromStorage(sessionId: string, asDownload = false): Promise<string[]> {
  const supabaseModule = await import('@/supabase/supabase');
  const { storage } = supabaseModule.default;
  supabaseStorageClient = storage;

  const { data, error } = await supabaseStorageClient.from(import.meta.env.VITE_STORAGE_BUCKET_ID).list(`${sessionId}/Chunks`);

  if (error) throw new Error('Failed to get chunks path from storage');

  const paths = data.map((fileObj) => {
    return `${sessionId}/Chunks/${fileObj.name}`;
  });

  const chunkUrls = paths.map((path) => {
    return getUploadedVideoUrl(path, supabaseStorageClient, asDownload);
  });

  return chunkUrls;
}
