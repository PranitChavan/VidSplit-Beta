import { useMutation } from '@tanstack/react-query';
import { getVideoChunksUrlFromStorage } from '@/services/video.service';
import { raiseErrorToast } from '@/utils/utils';

export default function useGetVideoChunksUrlFromStorage() {
  return useMutation({
    mutationFn: (sessionId: string) => getVideoChunksUrlFromStorage(sessionId, true),
    onError: () => {
      raiseErrorToast('Something went wrong, please try again!', true);
    },
    retry: 1,
  });
}
