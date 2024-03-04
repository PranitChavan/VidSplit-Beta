import { useMutation } from '@tanstack/react-query';
import splitVideoAndGetUrls from '@/services/splitVideo.service';
import { useVideoSettings } from '@/stores/video';
import { raiseErrorToast } from '@/utils/utils';

export default function useSplitVideo() {
  const chunkDuration = useVideoSettings((state) => state.chunkDuration);
  const sessionId = useVideoSettings((state) => state.sessionId);

  return useMutation({
    mutationFn: (uploadedVideoUrl: string) => splitVideoAndGetUrls({ videoUrl: uploadedVideoUrl, chunkDuration: chunkDuration!, sessionId: sessionId }),
    retry: 1,
    onError: () => {
      raiseErrorToast('Failed to split your video, please try again!', true);
    },
  });
}
