import { StorageClient } from '@supabase/storage-js';
import { toast } from 'sonner';

let supabaseStorage: StorageClient;

export async function uploadVideoFileToStorage(video: File | undefined): Promise<string | undefined> {
  if (!video) return;

  try {
    const supabaseModule = await import('@/supabase/supabase');
    const { storage } = supabaseModule.default;

    supabaseStorage = storage;

    const { data, error } = await storage.from('Videos').upload(`Original/${video.name}`, video, {
      upsert: true,
    });

    if (error) {
      throw new Error();
    }

    const publicUrl = await getUploadedVideoUrl(data.path);

    return publicUrl;
  } catch (err) {
    raiseErrorToast();
  }
}

async function getUploadedVideoUrl(path: string): Promise<string | undefined> {
  const { data } = supabaseStorage?.from('Videos').getPublicUrl(path);

  if (!data) {
    raiseErrorToast();
    return;
  }

  return data.publicUrl;
}

function raiseErrorToast(): void {
  toast.error('Failed to upload video, please try again!', {
    position: 'bottom-center',
  });
}
