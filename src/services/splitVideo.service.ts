import { SplitRequestParms } from '@/types/types';

export default async function splitVideo(videoParams: SplitRequestParms) {
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
    console.log(response);

    if (!response.ok) {
      throw new Error('Failed!');
    }

    return true;
  } catch (error) {
    throw error;
  }
}
