import { create } from 'zustand';
import { VideoFileState, VideoSplittingSettings, VideoStorageState } from '@/types/store.types';
import { devtools } from 'zustand/middleware';

export const useVideoStore = create<VideoFileState, any>(
  devtools((set) => ({
    videoFile: undefined,
    videoDuration: -1,
    setVideoFile: (videoFile: File | undefined) => set({ videoFile: videoFile }),
    setVideoDuration: (duration: number) => set({ videoDuration: duration }),
    reset: () => set({ videoFile: undefined, videoDuration: -1 }),
  }))
);

export const useVideoSettings = create<VideoSplittingSettings, any>(
  devtools((set) => ({
    chunkDuration: undefined,
    setChunkDuration: (duration: string) => set({ chunkDuration: duration }),
    reset: () => set({ chunkDuration: undefined }),
  }))
);

export const useVideoStorageState = create<VideoStorageState, any>(
  devtools((set) => ({
    uploadedVideoUrl: undefined,
    isTakingLongToUpload: false,
    setUploadedVideoUrl: (url: string) => set({ uploadedVideoUrl: url }),
    setIsTakingToLongToUpload: () => set((state) => ({ isTakingLongToUpload: !state.isTakingLongToUpload })),
  }))
);
