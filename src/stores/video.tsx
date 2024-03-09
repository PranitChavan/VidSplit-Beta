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
    sessionId: undefined,
    setChunkDuration: (duration: string) => set({ chunkDuration: duration }),
    setSessionId: (id: string) => set({ sessionId: id }),
    reset: () => set({ chunkDuration: undefined, sessionId: undefined }),
  }))
);

export const useVideoStorageState = create<VideoStorageState, any>(
  devtools((set) => ({
    uploadedVideoUrl: undefined,
    isTakingLongToUpload: false,
    sessionId: undefined,
    chunkUrls: [],
    setUploadedVideoUrl: (url: string) => set({ uploadedVideoUrl: url }),
    setIsTakingToLongToUpload: () => set((state) => ({ isTakingLongToUpload: !state.isTakingLongToUpload })),
    setChunkUrls: (urls: string[]) => set({ chunkUrls: urls }),
  }))
);
