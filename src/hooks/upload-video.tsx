import { useMutation } from '@tanstack/react-query';
import { uploadVideoFileToStorage } from '@/services/video.service';
import { raiseErrorToast } from '@/utils/utils';
import { useVideoSettings, useVideoStorageState } from '@/stores/video';

const INFORM_USER_TO_REFRESH_TIME = 180000; // Milliseconds after user is informed to refresh the page

export function useUploadVideoAndTriggerSplittingProcess() {
  const setIsTakingToLongToUpload = useVideoStorageState((state) => state.setIsTakingToLongToUpload);
  const sessionId = useVideoSettings((state) => state.sessionId);

  return useMutation({
    mutationFn: (videoFile: File) => uploadVideoFileToStorage(videoFile, sessionId!),
    onMutate: () => {
      const informUser = setTimeout(() => {
        setIsTakingToLongToUpload();
      }, INFORM_USER_TO_REFRESH_TIME);

      return informUser;
    },

    onError: () => {
      raiseErrorToast('Failed to upload video, please try again!', true);
    },

    onSettled: (_, __, ___, context) => {
      // __ is used to skip stuff which is not needed, dont think too much
      clearTimeout(context);
    },

    retry: 0,
  });
}
