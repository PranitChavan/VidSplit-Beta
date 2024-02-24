import { useMutation } from '@tanstack/react-query';
import { uploadVideoFileToStorage } from '@/services/videoupload.service';
import { raiseErrorToast } from '@/utils/utils';
import { useVideoStorageState } from '@/stores/video';

const INFORM_USER_TO_REFRESH_TIME = 2000; // Milliseconds after user is informed to refresh the page

export function useUploadVideo() {
  const { setIsTakingToLongToUpload } = useVideoStorageState();

  return useMutation({
    mutationFn: (videoFile: File) => uploadVideoFileToStorage(videoFile),
    onMutate: () => {
      const informUser = setTimeout(() => {
        setIsTakingToLongToUpload();
      }, INFORM_USER_TO_REFRESH_TIME);

      return informUser;
    },

    onError: () => {
      raiseErrorToast('Failed to upload video, please try again!');
    },

    onSettled: (_, __, ___, context) => {
      // __ is used to skip stuff which is not needed, dont think too much
      clearTimeout(context);
    },

    retry: 2,
  });
}
