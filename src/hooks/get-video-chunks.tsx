// import { useMutation } from '@tanstack/react-query';
// import { getVideoChunksUrlFromStorage } from '@/services/video.service';
// import { raiseErrorToast } from '@/utils/utils';
// import { toast } from 'sonner';

// export default function useGetVideoChunksUrlFromStorage() {
//   return useMutation({
//     mutationFn: (sessionId: string) => getVideoChunksUrlFromStorage(sessionId, true),
//     onError: () => {
//       raiseErrorToast('Something went wrong, please try again!', true);
//     },

//     onSuccess: () => {
//       toast.success('Video splitting successful! Please download the chunks using the download button.');
//     },
//     retry: 0,
//   });
// }
